import React , {Component, PropTypes} from 'react'
import { KeywordCon, TransferBtn, SuggestCon} from '../component/keywordsLayer'
import { connect } from 'react-redux'
import { render } from 'react-dom'
import * as mapDispatchToProps from '../actions/keywordsLayerAction'
import * as reducers from '../reducers/keywordsLayerReducer'

class KeywordsCon extends Component {
	constructor(props){
		super(props);
	}
	render(){
		return (
			<div id="keywords_layer">
				<KeywordCon initList = {this.props.initList} 
							maxSize = {this.props.maxSize}
							lang = {this.props.lang}
							addKeyword = {this.props.addKeyword}
							delKeyword = {this.props.delKeyword}
							removeAll = {this.props.removeAll}
							modifyKeyword = {this.props.modifyKeyword}
							suggestKeywords = {this.props.suggestKeywords}/>
				<TransferBtn transferSugget = {this.props.transferSugget}
							 lang = {this.props.lang}/>
				<SuggestCon suggestList = {this.props.suggestList}
							lang = {this.props.lang}
							selectSuggest = {this.props.selectSuggest}/>
			</div>
		)
	}
}
KeywordsCon.PropTypes = {
	initList : PropTypes.array,
	suggestList : PropTypes.array,
	isLoading : PropTypes.bool.isRequired,
	maxSize :PropTypes.number.isRequired,
	lang : PropTypes.string.isRequired,
	addKeyword : PropTypes.func,
	delKeyword : PropTypes.func,
	modifyKeyword : PropTypes.func,
	suggestKeywords : PropTypes.func,
	transferSugget : PropTypes.func,
	selectSuggest : PropTypes.func,
	removeAll : PropTypes.func,
	keywordsInit : PropTypes.func,
}

const mapStateToProps = (state) => {
	console.log(state.keywordsLayer)
	return {
		initList : state.keywordsLayer.initList,
		suggestList : state.keywordsLayer.suggestList,
		maxSize : state.keywordsLayer.maxSize,
		lang : state.keywordsLayer.lang,
		isLoading : state.keywordsLayer.isLoading,
	};
}

export default connect(mapStateToProps,mapDispatchToProps)(KeywordsCon)
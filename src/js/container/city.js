import React , { Component } from 'react'
import {connect} from 'react-redux'
import City from '../component/city'
import * as mapDispatchToProps from '../actions/cityAction'
import { getChinaData,getForeginData,getSelectedNumbers,getActiveTab} from '../reducers/cityReducers'

class CityCon extends Component{
	constructor(props){
		super(props)
	}
	render(){
		return (
			<City {...this.props}/>
		)
	}
}
const mapStatusToProps = (state) => {
	console.log(state);
	return {
		china : getChinaData(state),
		foreign : getForeginData(state),
		searchList : state.data.searchList,
		selectedNum : getSelectedNumbers(state),
		activeTab : getActiveTab(state),
	}
} 

export default connect(mapStatusToProps,mapDispatchToProps)(CityCon)




import React , { Component } from 'react'
import {connect} from 'react-redux'
import City from '../component/city'
import * as mapDispatchToProps from '../actions/cityAction'
import { getChinaData,getForeginData,getSelectedNumbers} from '../reducers/cityReducers'

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
		foregin : getForeginData(state),
		selectedNum : getSelectedNumbers(state),
	}
} 

export default connect(mapStatusToProps,mapDispatchToProps)(CityCon)




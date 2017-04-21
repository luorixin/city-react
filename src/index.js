import React , { Component} from "react"
import ReactDom,{render} from "react-dom"
import ReduxThunk from 'redux-thunk'
import {createLogger} from 'redux-logger'
import {Provider} from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reducers from './js/reducers'
import routes from './js/router/router'
import {getData} from './js/actions/cityAction'
import {keywordsInit} from './js/actions/keywordsLayerAction'
import './css/city.css'


const middleware = [ReduxThunk];
if (process.env.NODE_ENV!="production") {
	middleware.push(createLogger());
};
const store = createStore(
	reducers,
	applyMiddleware(...middleware)
)
store.dispatch(getData("./"));
store.dispatch(keywordsInit());
class Test extends Component{
	constructor(props){
		super(props)
	}
	render(){
		return <div>hello Test2</div>;
	}
}

render(
	<Provider store = {store}>
		{routes}
	</Provider>,
	// <Test></Test>,
	document.getElementById('app')
)
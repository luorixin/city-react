import React,{ Component } from 'react'
import {Router, Route,browserHistory,IndexRoute} from 'react-router'
import city from '../container/city'
import keywordsLayer from '../container/keywordsLayer'

const cityCom = (location,cb) => {
	require.ensure([],require => {
		cb(null,require('../container/city').default)
	},'city')
}

const keywordsCom = (location,cb) => {
	require.ensure([],require=>{
		cb(null,require('../container/keywordsLayer').default)
	},'keywordsLayer')
}

const RouteConfig = (
	<Router history={browserHistory}>
		<Route path="/">
			<IndexRoute component={city} />//首页
            <Route path="city" getComponent={cityCom} />
            <Route path="keywordsLayer" getComponent={keywordsCom} />
		</Route>
	</Router>
)

export default RouteConfig;

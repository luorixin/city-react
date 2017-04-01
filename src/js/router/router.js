import React,{ Component } from 'react'
import {Router, Route,browserHistory,IndexRoute} from 'react-router'
import city from '../container/city'

const cityCom = (location,cb) => {
	require.ensure([],require => {
		cb(null,require('../container/city').default)
	},'city')
}

const RouteConfig = (
	<Router history={browserHistory}>
		<Route path="/">
			<IndexRoute component={city} />//首页
            <Route path="city" getComponent={cityCom} />
		</Route>
	</Router>
)

export default RouteConfig;

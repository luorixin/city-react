import * as actionType from "../constants/actionType"
import fetch from 'isomorphic-fetch'
import Tool from '../config/tool'
import jsonData from '../api/city.json'

export const getDataStart = (url,postData) => {
	return {
		type : actionType.GET_DATA_START,
		url,
		postData
	}
}
export const getDataFailed = url => {
	return {
		type : actionType.GET_DATA_FAILED,
		url
	}
}
export const getDataSuccess = (url,json) => {
	return {
		type : actionType.GET_DATA_SUCCESS,
		url,
		json
	}
}

export const getData = (url,postData) => dispatch => {
	dispatch(getDataStart(url,postData));
	dispatch(getDataSuccess(url, jsonData))
}

export const clickTierCheck = (id) => {
	return {
		type : actionType.CHECK_TIER,
		id
	}
}

export const clickRegionCheck = (id) => {
	return {
		type : actionType.CHECK_REGION,
		id
	}
}

export const clickProvinceCheck = (id) => {
	return {
		type : actionType.CHECK_PROVINCE,
		id
	}
}

export const clickCityCheck = (id) => {
	return {
		type : actionType.CHECK_CITY,
		id
	}
}

export const clickCountryCheck = (id,isChecked) => {
	return {
		type : actionType.CHECK_COUNTRY,
		id,
		isChecked
	}
}

export const clickToolCheck = (tp) => {
	return {
		type : actionType.CHECK_TOOL,
		tp
	}
}
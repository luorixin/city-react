import * as actionType from '../constants/actionType'

export const getDataStart = (url) => {
	return {
		type : actionType.GET_KEYWORD_DATA_START,
		url
	}
}
export const getDataFailed = url => {
	return {
		type : actionType.GET_DATA_FAILED,
		url
	}
}
export const getInitDataSuccess = (url,json) => {
	return {
		type : actionType.GET_INIT_DATA_SUCCESS,
		url,
		json
	}
}

export const getSuggestDataSuccess = (json) => {
	return {
		type : actionType.GET_SUGGEST_DATA_SUCCESS,
		json
	}
}

export const keywordsInit = (url,postData) => dispatch => {
	dispatch(getDataStart(url));
	dispatch(getInitDataSuccess(url, []))
}

export const suggestKeywords = () => dispatch => {
	dispatch(getSuggestDataSuccess(["这","是","一个","例子"]))
}

export const addKeyword = (keyword) => {
	return {
		type : actionType.ADD_KEYWORD,
		keyword
	}
}

export const delKeyword = (keyword) => {
	return {
		type : actionType.DELETE_KEYWORD,
		keyword
	}
}

export const modifyKeyword = (oldKeyword,newKeyword) => {
	return {
		type : actionType.MODIFY_KEYWORD,
		oldKeyword,
		newKeyword
	}
}

export const removeAll = () => {
	return {
		type : actionType.REMOVEALL,
	}
}

export const selectSuggest = (keyword) => {
	return {
		type : actionType.SELECT_SUGGEST,
		keyword
	}
}

export const transferSugget = (keywords) => {
	return {
		type : actionType.TRANSFER_SUGGEST,
		keywords,
	}
}
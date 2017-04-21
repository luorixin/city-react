import * as constants from '../constants/actionType'
import { combineReducers } from 'redux'

/**
 * 根据suggest数组转换成json状态	
 * @param suggestArr
 * @return suggestJson
 */
const convertSuggest = (state,suggestArr) => {
	state.suggestList = [];
	if (suggestArr.length>0) {
		for(let suggest of suggestArr){
			state.suggestList.push({
				text : suggest,
				isSelected : false,
			})
		}
	};
	return state;
}

/**
 * 增加关键词
 */
const addKeyword = (state,keyword) => {
	addK(state,keyword);
	return state;
}
/**
 * 统一处理增加方法
 */
const addK = (state,keyword) => {
	if (keyword) {
		keyword = keyword.replace(/[\s\t\n]/,"");
		//判断是否存在，是否超出最大值
		if(state.initList.indexOf(keyword)==-1 && state.initList.length < state.maxSize){
			state.initList.push(keyword);
			return true;
		}
	}
	return false;
}

/**
 * 删除关键词
 */
const delKeyword = (state,keyword) => {
	console.log(state)
	if (keyword) {
		// let index = state.initList.indexOf(keyword);
		// state.initList.splice(index,1); splice不会触发更新？
		let newList = new Array();
		for(let i of state.initList){
			if(i!==keyword){
				newList.push(i);
			}
		}
		state.initList = newList;
	}
	return state;
}

/**
 * 修改关键词
 */
const modifyKeyword = (state,oldKeyword,newKeyword) => {
	if (oldKeyword && newKeyword && oldKeyword!=newKeyword) {
		// let index = state.initList.indexOf(oldKeyword);
		// state.initList.splice(index,1,newKeyword);
		let newList = new Array();
		let isUpdate = true;
		for(let i of state.initList){
			if (i==newKeyword) {
				isUpdate = false;
			};
			if(i!==oldKeyword){
				newList.push(i);
			}else{
				newList.push(newKeyword);
			}
		}
		if(isUpdate){
			state.initList = newList;
		}
	};
	return state;
}

/**
 * 选中建议
 */
const selectSuggest = (state, keyword) => {
	if (keyword) {
		for(let suggest of state.suggestList){
			if(suggest.text == keyword){
				suggest.isSelected = !suggest.isSelected;
			}
		}
		state.suggestList = Object.assign([],state.suggestList);//不加这句不会触发组件更新？
	};
	return state;
}
/**
 * 删除建议
 */
const delSuggest = (state, keyword) => {
	if (keyword) {
		// let index = state.suggestList.indexOf(keyword);
		// state.suggestList.splice(index,1);
		let newList = new Array();
		for(let i of state.suggestList){
			if(i.text!==keyword){
				newList.push(i);
			}
		}
		state.suggestList = newList;
	};
	return state;
}
/**
 * 将建议移动到关键词栏目
 */
const transferSuggest = (state, keywords) => {
	if (keywords.length>0) {
		for(let keyword of keywords){
			//增加关键词栏目
			if(addK(state,keyword)){
		      //删除建议栏目
			  delSuggest(state,keyword);
			}
		}
	}
	return state;
}
/**
 *state={
 *	initList:[],
 *	suggestList:[],
 *	isLoading:false,
 *  lang:"en"
 *}
 */
const keywords = (state={},action) => {
	switch (action.type) {
	    case constants.GET_KEYWORD_DATA_START:
		    return {
		      initList : [],
		      suggestList : [],
		      isLoading : false,
		      maxSize : 20,
		      lang : 'en'
		    }
	    case constants.GET_INIT_DATA_SUCCESS:
	    	return Object.assign({},state,{isLoading:true,initList:action.json})
	    case constants.GET_SUGGEST_DATA_SUCCESS:
	    	return Object.assign({},convertSuggest(state,action.json));
	    case constants.ADD_KEYWORD:
	    	return Object.assign({},addKeyword(state,action.keyword));
    	case constants.DELETE_KEYWORD:
	    	return Object.assign({},delKeyword(state,action.keyword));
	    case constants.MODIFY_KEYWORD:
	    	return Object.assign({},modifyKeyword(state,action.oldKeyword,action.newKeyword))
	    case constants.SELECT_SUGGEST:
	    	return Object.assign({},selectSuggest(state,action.keyword))
	    case constants.TRANSFER_SUGGEST:
	    	return Object.assign({},transferSuggest(state,action.keywords))
	    case constants.REMOVEALL:
	    	return Object.assign({},state,{initList:[]})
	    default:
	    	return state
	}
}
export default keywords;
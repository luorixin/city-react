import { combineReducers } from "redux"
import cityReducers from "./cityReducers"
import keywordsLayerReducer from "./keywordsLayerReducer"

const reducers = combineReducers({
	city : cityReducers,
	keywordsLayer : keywordsLayerReducer
})
export default reducers
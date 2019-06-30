import { combineReducers } from 'redux';
import stocksReducer from './stocksReducer';
import stockListReducer from './stockListReducer';

export default combineReducers({
    stocksReducer,
    stockListReducer
})
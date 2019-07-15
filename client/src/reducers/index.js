import { combineReducers } from 'redux';
import stocksReducer from './stocksReducer';
import stockListReducer from './stockListReducer';
import authReducer from './authReducer';

export default combineReducers({
    stocksReducer,
    stockListReducer,
    authReducer
})
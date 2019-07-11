import { combineReducers } from 'redux';
import stocksReducer from './stocksReducer';
import stockListReducer from './stockListReducer';
import auth from './auth';

export default combineReducers({
    stocksReducer,
    stockListReducer,
    auth
})
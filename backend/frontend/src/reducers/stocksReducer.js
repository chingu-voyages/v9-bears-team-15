import { FETCH_STOCK, FETCH_ERROR, CLEAR_STOCK } from '../actions/types';

const initialState = {
    symbol: '',
    lastSalePrice: null
}
        
export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case FETCH_STOCK:
        case FETCH_ERROR:
            return {
                ...state,
                symbol: payload.symbol,
                lastSalePrice: payload.lastSalePrice
            }
        case CLEAR_STOCK: 
            return {
                ...state,
                symbol:'',
                lastSalePrice: null
            }
        default:
            return state;
    }
}
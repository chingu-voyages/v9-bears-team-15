import { FETCH_STOCK, FETCH_ERROR } from '../actions/types';

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
        default:
            return state;
    }
}
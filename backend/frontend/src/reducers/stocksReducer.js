import { SETUP_STOCK, FETCH_STOCK } from '../actions/types';

const initialState = {
    symbol: '',
    lastSalePrice: null
}
        
export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case FETCH_STOCK:
        case SETUP_STOCK:
            return {
                ...state,
                symbol: payload.symbol,
                lastSalePrice: payload.lastSalePrice
            }
        default:
            return state;
    }
}
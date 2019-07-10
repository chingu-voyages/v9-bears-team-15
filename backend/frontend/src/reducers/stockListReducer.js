import { FETCH_STOCKLIST, PURCHASE_SUCCESSFUL, SELL_SUCCESSFUL, UPDATE_PRICE } from '../actions/types';

const initialState = {
    stocks:[]
}
        
export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case FETCH_STOCKLIST:
            return {
                ...state,
                stocks:payload
            }
        case PURCHASE_SUCCESSFUL:
            return {
                ...state,
                stocks:[...state.stocks, payload]
            }
        case SELL_SUCCESSFUL:
            return {
                ...state,
                stocks:state.stocks.filter(stock => (stock.id !== payload))
            }
        default:
            return state;
    }
}
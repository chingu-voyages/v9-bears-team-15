import { FETCH_STOCKLIST, PURCHASE_SUCCESSFUL, SELL_SUCCESSFUL, UPDATE_PRICE, PURCHASE_EXISTING_SUCCESSFUL } from '../actions/types';

const initialState = {
    stocks:[]
}
        
export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case UPDATE_PRICE:
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
        case PURCHASE_EXISTING_SUCCESSFUL:
            return {
                ...state,
                stocks:state.stocks.map(stock => stock.id !== payload.id ? stock : payload )
            }
        case SELL_SUCCESSFUL:
            return {
                ...state,
                stocks:state.stocks.filter(stock => (stock._id !== payload))
            }
        default:
            return state;
    }
}
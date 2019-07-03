import { FETCH_STOCKLIST, PURCHASE_SUCCESSFUL } from '../actions/types';

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
        default:
            return state;
    }
}
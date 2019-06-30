import { FETCH_STOCKLIST } from '../actions/types';

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
        default:
            return state;
    }
}
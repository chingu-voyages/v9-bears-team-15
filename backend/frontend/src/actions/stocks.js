import { FETCH_STOCK, FETCH_ERROR } from '../actions/types';
import axios from 'axios';

export const fetchPrice = symbol => dispatch => {
    axios.get(`https://api.iextrading.com/1.0/tops?symbols=${symbol}`)
    .then(response => {
        if (response.data.length > 0){
            dispatch({
                type: FETCH_STOCK,
                payload: {
                    symbol: response.data[0].symbol,
                    lastSalePrice: response.data[0].lastSalePrice
                }
            });
        } else {
            dispatch({
                type: FETCH_ERROR,
                payload: {
                    symbol: 'Fetch Error',
                    lastSalePrice: 9999
                }
            })
        }
    })
}


import { FETCH_STOCK, FETCH_ERROR, FETCH_STOCKLIST } from '../actions/types';
import axios from 'axios';

export const fetchPrice = symbol => dispatch => {
    axios.get(`api/stocks/fetch_stock/?symbol=${symbol}`)
    .then(response => {
        if (response.data){
            dispatch({
                type: FETCH_STOCK,
                payload: {
                    symbol: response.data['01. symbol'],
                    lastSalePrice: Number.parseFloat(response.data['05. price']).toFixed(2)
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

export const fetchStockList = () => dispatch => {
    axios.get('/api/stocks/')
    .then(response => {
        dispatch({
            type: FETCH_STOCKLIST,
            payload: response.data
        })
    });
}


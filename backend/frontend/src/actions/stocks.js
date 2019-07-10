import { FETCH_STOCK, 
         FETCH_ERROR, 
         UPDATE_PRICE,
         FETCH_STOCKLIST, 
         PURCHASE_SUCCESSFUL,
         SELL_SUCCESSFUL } from '../actions/types';
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
                    lastSalePrice: null
                }
            })
        }
    })
    .catch(err => console.log(err));
}

export const fetchStockList = () => dispatch => {
    axios.get('/api/stocks/')
    .then(response => {
        dispatch({
            type: FETCH_STOCKLIST,
            payload: response.data
        })
    })
    .catch(err => console.log(err));
}

export const updateStockPrice = () => dispatch => {
    axios.get('/api/stocks/update_stocks/')
    .then(response => {
        dispatch({
            type: UPDATE_PRICE,
            payload: response.data
        })
    })
    .catch(err => console.log(err));
}

export const purchaseStock = ({ stockSymbol, purchasePrice, currentPrice, quantity }) => dispatch => {
    const body = {
        stockSymbol,
        purchasePrice,
        currentPrice,
        quantity
    }
    axios.post('/api/stocks/', body)
    .then(response => {
        dispatch({
            type:PURCHASE_SUCCESSFUL,
            payload: response.data
        })
    })
    .catch(err => console.log(err));
}

export const sellStock = (stock_id) => dispatch => {
    axios.delete(`/api/stocks/${stock_id}/`)
    .then(response => {
        if (response.status===204) {
            dispatch({
                type: SELL_SUCCESSFUL,
                payload:stock_id
            })
        }
    })
    .catch(err => console.log(err));
}


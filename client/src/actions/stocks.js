import { FETCH_STOCK, 
         FETCH_ERROR, 
         UPDATE_PRICE,
         FETCH_STOCKLIST, 
         PURCHASE_SUCCESSFUL,
         PURCHASE_EXISTING_SUCCESSFUL,
         SELL_SUCCESSFUL,
         CASHONHAND_UPDATED,
         CLEAR_STOCK } from '../actions/types';
import axios from 'axios';
import { tokenConfig } from './auth';
import { loadUser } from './auth';

export const fetchPrice = symbol => (dispatch, getState) => {
    axios.get(`api/stocks/fetch_stock/${symbol}`, tokenConfig(getState))
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

export const fetchStockList = () => (dispatch, getState) => {
    axios.get('/api/stocks/', tokenConfig(getState))
    .then(response => {
        dispatch({
            type: FETCH_STOCKLIST,
            payload: response.data
        })
    })
    .catch(err => console.log(err));
}

export const updateStockPrice = () => (dispatch, getState) => {
    axios.get('/api/stocks/update_stocks/', tokenConfig(getState))
    .then(response => {
        dispatch({
            type: UPDATE_PRICE,
            payload: response.data
        })
    })
    .catch(err => console.log(err));
}

export const purchaseStock = ({ symbol, purchasePrice, quantity }) => (dispatch, getState) => {
    const body = {
        symbol,
        purchasePrice,
        quantity
    }
    axios.post('/api/stocks/', body, tokenConfig(getState))
    .then(response => {
        dispatch({
            type:PURCHASE_SUCCESSFUL,
            payload: response.data
        });
        dispatch({type: CLEAR_STOCK});
        const { quantity, purchasePrice } = response.data;
        const stockSale =  quantity * purchasePrice;
        axios.post('/api/users/updateCash',{ stockSale }, tokenConfig(getState))
        .then(response => {
            dispatch({
                type: CASHONHAND_UPDATED,
                payload: response.data
            })
        })
    })
    .catch(err => console.log(err));
    
}

export const purchaseExistingStock = (id, quantity) => (dispatch, getState) => {
    const body = {
        quantity
    }
    axios.patch(`/api/stocks/${id}/`, body, tokenConfig(getState))
    .then(response => {
        dispatch({
            type: PURCHASE_EXISTING_SUCCESSFUL,
            payload: response.data
        })
        dispatch({type: CLEAR_STOCK});
    })
    .catch(err => console.log(err));


}

export const sellStock = (stock_id) => (dispatch, getState) => {
    console.log(stock_id);
    axios.delete(`/api/stocks/${stock_id}/`, tokenConfig(getState))
    .then(response => {
        if (response.status===200) {
            dispatch({
                type: SELL_SUCCESSFUL,
                payload:stock_id
            })
        }
    })
    .catch(err => console.log(err));
}

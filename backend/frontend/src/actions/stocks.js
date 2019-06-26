import { SETUP_STOCK, FETCH_STOCK } from '../actions/types';
import axios from 'axios';

export const initialStockSetup = () => {
    return {
        type: SETUP_STOCK,
        payload: {
            symbol: 'SNAP',
            lastSalePrice: 14.52
        }
    }
}

export const fetchPrice = symbol => dispatch => {
    console.log(symbol);
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
        }
    })
}


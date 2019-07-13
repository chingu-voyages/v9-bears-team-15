const express = require('express');
const router = express.Router();
const axios = require('axios');
const stock_key = require('../../config/keys').stock_key;

// Stock Model
const Stock = require('../../models/Stock');

// @route GET api/stocks
// @description Get all stocks for a user
// @access Protected (Public for the moment)
router.get('/', (req, res) => {
    Stock.find()
        .sort('symbol')
        .then(stocks => res.json(stocks))
        .catch(err => res.status(400).json({"error":"Invalid call"}));
})

// @route GET api/stocks/fetch_stock?symbol={symbol}
// @description Get all stocks for a user
// @access Protected (Public for the moment)
router.get('/fetch_stock/:symbol', (req, res) => {
    url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${req.params.symbol}&apikey=${stock_key}`
    axios.get(url)
        .then(results => res.json(results.data['Global Quote']))
        .catch(err => res.status(400).json({"error":"Invalid call"}));
})

// @route GET api/stocks/update_stocks
// @description Update All Currently Owned Stocks
// @access Protected (Public for the moment)
router.get('/update_stocks',async (req, res) => {
    //FOLLOW Node-todo-api Patch example 
    // const stocks = await Stock.find();
    // stocks.map(stock => {
    //     Stock.findOneAndUpdate({symbol: stock.symbol})
    //     .then(async foundStock => {
    //         const newPrice = await axios.get(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stock.symbol}&apikey=${stock_key}`)
    //                 if (results.data["Global Quote"]) {
    //                     stock.currentPrice = results.data["Global Quote"]["05. price"];
    //                 } else {
    //                     res.status(400).json({"msg":"Exceeded Stock API Quota Call"});
    //                 }
    //     })
    // })
        // .then(stocks => {
        //     stocks.map(async stock => {
        //         console.log(stock.symbol);
        //         const results = await axios.get(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stock.symbol}&apikey=${stock_key}`)
        //         if (results.data["Global Quote"]) {
        //             stock.currentPrice = results.data["Global Quote"]["05. price"];
        //         } else {
        //             res.status(400).json({"msg":"Exceeded Stock API Quota Call"});
        //         }
        //     });
        // })
        // .catch(err => res.status(400).json({'err':err}));
    res.json({"msg":"stocks updated!"});
})

// @route POST api/stocks
// @description Add a Stock Purchase
// @access Protected (Public for the moment)
router.post('/', (req, res) => {
    const stockInfo = {
        symbol: req.body.symbol,
        purchasePrice: req.body.purchasePrice,
        quantity: req.body.quantity || 1
    }
    const newStock = new Stock(stockInfo);
    newStock.save()
        .then(stock => res.json(stock))
        .catch(err => res.status(400).json({"error":"Invalid data provided"}));
})

// @route DELETE api/stocks
// @description Delete a Stock 
// @access Protected (Public for the moment)
router.delete('/:id', (req, res) => {
    Stock.findByIdAndDelete(req.params.id)
        .then(stock => res.json(stock))
        .catch(err => res.status(400).json({"error":"Invalid data provided"}));
})


module.exports = router;
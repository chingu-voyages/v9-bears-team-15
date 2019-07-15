const express = require('express');
const router = express.Router();
const axios = require('axios');
const stock_key = require('../../config/keys').stock_key;
const { ObjectID } = require('mongodb');
const auth = require('../../middleware/auth');

// Stock Model
const Stock = require('../../models/Stock');

// @route           GET api/stocks
// @description     Get all stocks for a user
// @access          Private
router.get('/', auth, (req, res) => {
    Stock.find({
        creator:req.user.id
    })
        .sort('symbol')
        .then(stocks => res.json(stocks))
        .catch(err => res.status(400).json({"error":"Invalid call"}));
})

// @route           GET api/stocks/fetch_stock?symbol={symbol}
// @description     Get all stocks for a user
// @access          Private
router.get('/fetch_stock/:symbol', auth, (req, res) => {
    url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${req.params.symbol}&apikey=${stock_key}`
    axios.get(url)
        .then(results => res.json(results.data['Global Quote']))
        .catch(err => res.status(400).json({"error":"Invalid call"}));
})

async function _stockLookup(symbol) {
    const response = await axios.get(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${stock_key}`);
    return response.data;
}

// @route           GET api/stocks/update_stocks
// @description     Update All Currently Owned Stocks
// @access          Private
router.get('/update_stocks',auth, async (req, res) => {
    //FOLLOW Node-todo-api Patch example 
    const stocks = await Stock.find({
        creator:req.user.id
    });
    let updatedStocks;
    try {
        updatedStocks = await Promise.all(stocks.map(stock => _stockLookup(stock.symbol)));
    } catch (err) {
        res.status(400).json({"error":err});
    }
    const updatedPrices = updatedStocks.reduce((acc, data) => {
        if (data['Global Quote']) {
            const symbol = data['Global Quote']['01. symbol']
            return {
                ...acc,
                [symbol]:{
                    price:data['Global Quote']['05. price']
                }
            }
        } else {
            res.status(400).json({msg:"Symbol Lookup Quota Exceeded"});
        }
    }, {});
    try {
        const arr = await Promise.all(stocks.map(async stock => await _updateEachStock(stock, updatedPrices)));
        res.json(arr);
    } catch (err) {
        res.status(400).json({"error":err});
    } 
});
 

function _updateEachStock(stock, updatedPrices) {
    return Stock.findOneAndUpdate({
        _id:stock._id
    },{$set:{ currentPrice : updatedPrices[stock.symbol].price, updatedOn:Date.now() } }, { new:true })
}

    

// @route               POST api/stocks
// @description         Add a Stock Purchase
// @access              Private
router.post('/',auth, (req, res) => {
    const stockInfo = {
        symbol: req.body.symbol,
        purchasePrice: req.body.purchasePrice,
        currentPrice: req.body.purchasePrice,
        quantity: req.body.quantity || 1,
        creator: req.user.id
    }
    const newStock = new Stock(stockInfo);
    newStock.save()
        .then(stock => res.json(stock))
        .catch(err => res.status(400).json({"error":"Invalid data provided"}));
})

// @route               POST api/stocks/:id
// @description         Purchase more shares of a currently owned stock
// @access              Private
router.patch('/:id', auth, (req, res)=> {
    const id = req.params.id;
    const { quantity } = req.body;
    if (!ObjectID.isValid(id)) {
        res.status(404).send();
    }
    Stock.findOneAndUpdate({
        _id:id
    }, {$set: { quantity } }, {new: true})
    .then(stock => {
        if (!stock) {
            return res.status(404).send();
        }
        res.send(stock);
    })
    .catch(err => console.log("Error:",err));
})


// @route               DELETE api/stocks
// @description         Delete a Stock 
// @access              Private
router.delete('/:id', auth, (req, res) => {
    Stock.findByIdAndDelete(req.params.id)
        .then(stock => res.json(stock))
        .catch(err => res.status(400).json({"error":"Invalid data provided"}));
})


module.exports = router;
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const stocks = require('./routes/api/stocks');
//Sets up api/stocks/ as a route

const app = express();

app.use(bodyParser.json());

const db = require('./config/keys').mongoURI;

// Connect to MongoB
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(()=> console.log('MongoDB connected...'))
    .catch(err => console.log(err));

app.use('/api/stocks', stocks);

const port = process.env.PORT || 5000;


app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
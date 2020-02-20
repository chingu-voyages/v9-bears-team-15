const express = require('express');
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

const stocks = require('./routes/api/stocks');
const users = require('./routes/api/users');
const auth = require('./routes/api/auth');

const app = express();

app.use(express.json());

const db = require('./config/keys').mongoURI;

// Connect to MongoB
mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology:true })
    .then(()=> console.log('MongoDB connected...'))
    .catch(err => console.log(err));

app.use('/api/stocks', stocks);
app.use('/api/users', users);
app.use('/api/auth', auth);

const port = process.env.PORT || 5000;


app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
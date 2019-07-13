const pw = require('./api').pw;

module.exports = {
    mongoURI: `mongodb+srv://bears15:${pw}@stockgame-uo0v3.mongodb.net/stockgame?retryWrites=true&w=majority`
};
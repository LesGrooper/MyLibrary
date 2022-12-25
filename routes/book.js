const bookRoute = require('express').Router();
const { BookController } = require('../controllers');

bookRoute.get('/', BookController.index)

bookRoute.post('/create', BookController.create)

bookRoute.get('/search', BookController.search)

module.exports = bookRoute
const bookRoute = require('express').Router();
const { BookController } = require('../controllers');

bookRoute.get('/', BookController.index)

bookRoute.post('/create', BookController.create)

module.exports = bookRoute
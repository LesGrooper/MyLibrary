const publisherRoute = require('express').Router();
const { PublisherController } = require('../controllers');

publisherRoute.get('/', PublisherController.index)

publisherRoute.post('/create', PublisherController.create)

module.exports = publisherRoute
const publishedByRoute = require('express').Router();
const { PBController } = require('../controllers');

publishedByRoute.get('/', PBController.index)

module.exports = publishedByRoute
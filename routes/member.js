const memberRoute = require('express').Router();
const { MemberController } = require('../controllers');

memberRoute.get('/', MemberController.index)

memberRoute.post('/create', MemberController.create)

memberRoute.get('/search', MemberController.search)

module.exports = memberRoute
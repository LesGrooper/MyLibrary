const route = require("express").Router();
const index = require('../controllers/index');

route.get("/", (req, resp) => {
  resp.render(`index.ejs`)
}, index.showBooks);
// route.get('/')

const bookRoutes = require('./book');
const memberRoutes = require('./member');
const publisherRoutes = require('./publisher');
const publishedByRoutes = require('./publishedBy');

route.use("/books", bookRoutes)
route.use("/members", memberRoutes)
route.use("/publishers", publisherRoutes)
route.use("/publishedBies", publishedByRoutes)

module.exports = route;
const route = require("express").Router();

route.get("/", (req, resp) => {
  resp.json({
    message: "Masuk",
  });
});

const bookRoutes = require('./book');
const memberRoutes = require('./member');
const publisherRoutes = require('./publisher');
const publishedByRoutes = require('./publishedBy');

route.use("/books", bookRoutes)
route.use("/members", memberRoutes)
route.use("/publishers", publisherRoutes)
route.use("/publishedBies", publishedByRoutes)

module.exports = route;
const publisherRoute = require("express").Router();
const { PublisherController } = require("../controllers");

publisherRoute.get("/", PublisherController.index);

publisherRoute.get("/:id/detail", PublisherController.detail);

publisherRoute.post("/create", PublisherController.create);

publisherRoute.post("/update/:id", PublisherController.update);

publisherRoute.get("/delete/:id", PublisherController.delete);

publisherRoute.get("/search", PublisherController.search);


module.exports = publisherRoute;

const publishedByRoute = require("express").Router();
const { PBController } = require("../controllers");

publishedByRoute.get("/", PBController.index);

publishedByRoute.post("/create", PBController.create);
publishedByRoute.post("/create", PBController.add);

publishedByRoute.post("/update/:id", PBController.update);
publishedByRoute.post("/update/:id", PBController.edit);

publishedByRoute.get("/delete/:id", PBController.delete);

module.exports = publishedByRoute;

const bookRoute = require("express").Router();
const { BookController } = require("../controllers");

bookRoute.get("/", BookController.index);

bookRoute.get("/:id/detail", BookController.detail);

bookRoute.post("/create", BookController.create);
bookRoute.get("/create", BookController.add);

bookRoute.post("/update/:id", BookController.update);
bookRoute.get("/update/:id", BookController.edit);

bookRoute.get("/delete/:id", BookController.delete);

bookRoute.get("/search", BookController.search);



module.exports = bookRoute;

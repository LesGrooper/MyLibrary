const memberRoute = require("express").Router();
const { MemberController } = require("../controllers");

memberRoute.get("/", MemberController.index);

memberRoute.get("/:id/detail", MemberController.detail);

memberRoute.post("/create", MemberController.create);

memberRoute.post("/update/:id", MemberController.update);

memberRoute.get("/delete/:id", MemberController.delete);

memberRoute.get("/search", MemberController.search);

memberRoute.get("/search", MemberController.search);

module.exports = memberRoute;

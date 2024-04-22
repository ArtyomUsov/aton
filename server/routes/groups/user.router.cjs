const { Router } = require("express");
const UserController = require("../../controllers/User.controller.cjs");
const router = new Router();

router.get("/", UserController.getCurrentUser);

router.post("/", UserController.create);

module.exports = router;

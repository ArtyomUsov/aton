const { Router } = require("express");
const AuthController = require("../../controllers/Auth.controller.cjs");
const router = new Router();

router.post("/", AuthController.auth);

module.exports = router;

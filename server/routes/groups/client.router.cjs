const { Router } = require("express");
const ClientController = require("../../controllers/Client.controller.cjs");
const router = new Router();

router.get("/", ClientController.getClientsByUserId);

router.put("/", ClientController.putClientsByUserId);

module.exports = router;

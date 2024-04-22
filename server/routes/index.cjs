const { Router } = require("express");
const router = new Router();
const routerUser = require("./groups/user.router.cjs");
const routerAuth = require("./groups/auth.router.cjs");
const routerClient = require("./groups/client.router.cjs");

router.use("/user",
  routerUser);
router.use("/auth", routerAuth);
router.use("/client", routerClient)

module.exports = router;

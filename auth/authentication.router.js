const router = require("express").Router();

const { googleLogin } = require("./authentication.controller");
router.post("/googleLogin", googleLogin);

module.exports = router;

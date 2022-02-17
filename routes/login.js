const express = require('express');
const router = express.Router();
const { loginUser } = require("../controllers/loginControllers");


// userLogin setup ---------------->
router.post("/", loginUser);

module.exports = router;
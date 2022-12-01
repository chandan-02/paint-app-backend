const express = require("express");
const router = express.Router();

// controller 
const {createNewUser,loginUser} = require('../controller/user');

router.route('/login').post(loginUser)
router.route('/register').post(createNewUser)

module.exports = router;
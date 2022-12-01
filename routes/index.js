const express = require("express");
const router = express.Router();

// Routers 
const userRouter = require('./user');
const paintRouter = require('./paint');

router.use('/user', userRouter)
router.use('/paint', paintRouter)

module.exports = router;
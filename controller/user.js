const asyncHandler = require('../middleware/asyncHandler');
const ErrorResponse = require('../utils/ErrorResponse');
const { validationCheck } = require('../middleware/validationCheck');
const { hashPassword, comparePassword } = require('../utils/hashing')
const crypto = require('crypto')
const jwt = require("jsonwebtoken");

//models
const User = require('../model/user');

exports.createNewUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const userData = {
        name, email, password
    };
    const validation = validationCheck({
        name, email, password
    });
    if (!validation.status) {
        throw new ErrorResponse(`Please provide a ${validation?.errorAt}`, 400);
    }
    //Check if email already registered
    let userEmailVerfication = await User.findOne({ email: email });
    if (userEmailVerfication) {
        throw new ErrorResponse("Email already registered", 400);
    }
    const hashedPassword = await hashPassword(password);
    userData.password = hashedPassword;
    try {
        const userCreation = await User.create(userData);
        return res.status(201).json({ success: true, data: userCreation });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
})

exports.loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const loginData = { email, password };
    const validation = validationCheck(loginData);
    if (!validation.status) {
        throw new ErrorResponse(`Please provide a ${validation?.errorAt}`, 400);
    }

    try {
        const userData = await User.findOne({ email });
        if (!userData) {
            throw new ErrorResponse(`email provided doesn't exist`, 400);
        }
        const passwordOk = await comparePassword(password, userData.password);
        console.log(password,passwordOk)
        if (passwordOk) {
            const token = jwt.sign(
                {
                    userid: userData._id
                },
                process.env.JWT_SECRET, {
                expiresIn: 60 * 60 * 24 * 7
            });
            let date = new Date();
            date.setDate(date.getDate() + 6);
            delete userData.password;
            return res.status(200).json({ success: true, data: userData, jwt: { token, expiry: date.toISOString() } });
        } else {
            throw new ErrorResponse(`email or password incorrect`, 400);
        }
    } catch (error) {
        throw new ErrorResponse(`${error}`, 400);
    }
})
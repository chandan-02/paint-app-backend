const mongoose = require("mongoose");

const userScheme = new mongoose.Schema(
    {
        name: {
            type: String,
            require: [true, "Please provide name"],
            trim: true,
        },
        email: {
            type: String,
            match: [
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                "Please provide a valid email address",
            ],
            unique: true,
            required: [true, "Please provide a email address"],
        },
        password: {
            type: String,
            unique: true,
            require: [true, "Please provide Password"],
            trim: true,
        },
    },
    { timestamps: true }
);
module.exports = mongoose.model("user", userScheme);

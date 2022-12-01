const mongoose = require("mongoose");

const paintScheme = new mongoose.Schema(
    {
        name: {
            type: String,
            require: [true, "Please provide name"],
            trim: true,
        },
        json: {
            type: JSON,
            require: [true, "Please provide String"],
            trim: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
        },
    },
    { timestamps: true }
);
module.exports = mongoose.model("paint", paintScheme);

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
        type: {
            type: String,
            enum: ["public", "private"],
            default: "public",
            trim: true,
        },
        likecount: {
            type: Number,
            default: 0,
            trim: true,
        }
    },
    { timestamps: true }
);
module.exports = mongoose.model("paint", paintScheme);

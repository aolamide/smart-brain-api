const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name : {
        type: String,
        trim: true,
        required : true
    },
    email : {
        type: String,
        trim: true,
        required : true
    },
    hash : {
        type: String,
        trim: true,
        required : true
    },
    entries : {
        type: Number,
        default : 0
    },
    joined: {
        type: Date,
        default: Date.now
    }
})

exports.User = mongoose.model("user", userSchema);
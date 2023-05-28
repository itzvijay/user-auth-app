const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 30
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minLength: 6,
        maxLength: 255
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
        maxLength: 1024
    }
})

const User = mongoose.model("User",UserSchema);
module.exports = User;
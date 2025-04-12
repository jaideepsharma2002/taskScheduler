const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required : [true, "please add the email"],
        unique: [true, "email address already taken"]
    },
    password: {
        type: String,
        required :[true, "please enter the Password"]
    }
}, {
    timestamps: true,
});


module.exports = mongoose.model("User", userSchema);
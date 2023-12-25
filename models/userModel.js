const mongoose = require("mongoose")

const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "please add the username"]
        },
        email: {
            type: String,
            required: [true, "please add the Contact email"],
            unique: [true, "This email is already registered."]
        },
        password: {
            type: String,
            required: [true, "please add the user password"]
        },
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("User", userSchema)
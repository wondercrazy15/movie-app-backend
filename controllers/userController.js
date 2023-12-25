const asyncHandler = require("express-async-handler")
const bcypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/userModel")

//desc Register a user
//route POST users/register
//access public

const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body
    if (!username || !email || !password) {
        res.status(400)
        throw new Error("All Fields are mandatory")
    }
    const userAvailable = await User.findOne({ email })
    if (userAvailable) {
        res.status(400)
        throw new Error("User Already Registered.")
    }

    // hash password
    const hashedPassword = await bcypt.hash(password, 10)

    const user = await User.create({
        username,
        email,
        password: hashedPassword
    })
    if (user) {
        res.status(200).json({
            data: true,
            error: false
        })
    } else {
        res.status(400).json({
            data: false,
            error: true
        })
        throw new Error("User Data is not valid")
    }
})

//desc Login user
//route POST users/login
//access public

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        res.status(400)
        throw new Error("All Fields are Mandatory!")
    }
    const user = await User.findOne({ email })
    // compare password with hashed password
    if (user && (await bcypt.compare(password, user.password))) {
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id
            }
        }, process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "24h" }
        )
        res.status(200).json({ 
            accessToken : accessToken,
            error: false
         })
    } else {
        res.status(401).json({
            data: false,
            error: true
        })
        throw new Error("email or password is not valid")
    }
})

//desc Current User Info
//route GET users/current
//access private

const currentUser = asyncHandler(async (req, res) => {
    if (req.user) {
        res.status(200).json({
            userDetails: req.user,
            error: false
        })
    } else {
        res.status(401).json({
            data: false,
            error: true
        })
    }
})

module.exports = { registerUser, loginUser, currentUser }
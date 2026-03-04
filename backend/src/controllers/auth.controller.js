const userModel = require('../models/user.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cookies = require('cookie-parser')
const blacklistModel = require('../models/blacklist.model')
/**
 * @name registerUserController
 * @description Controller for registering a new user , it will take the username , email and password from the request body and create a new user in the database
 * @access Public
 * 
 */

const registerUserController = async (req, res) => {
    const { username, email, password } = req.body
    if (!username || !email || !password) {
        return res.status(400).json({
            messagae: "please provide username,email or password"
        })
    }
    const isUserAlreadyExists = await userModel.findOne({
        $or: [{ username }, { email }]
    })

    if (isUserAlreadyExists) {
        return res.status(400).json({
            messagae: "user already exists"
        })
    }
    const hashedpassword = await bcrypt.hash(password, 10)
    const user = await userModel.create({
        username,
        email,
        password: hashedpassword
    })

    const token = jwt.sign(
        { id: user._id, password: user.username },
        process.env.JWT_SECRETKEY,
        { expiresIn: "1d" }
    )

    res.cookie("token", token)

    res.status(201).json({
        message: "user created successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}

/**
 * @name loginUserController
 * @description Controller for logging in a user , it will take the email and password from the request body and check if the user exists in the database and if the password is correct then it will return a token to the client
 * @access Public
 * 
 */

const loginUserController = async (req, res) => {
    const { email, password } = req.body

    const user = await userModel.findOne({ email })

    if (!user) {
        return res.status(400).json({
            message: "email or password is invalid"
        })
    }

    const isPasswordValid = bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
        return res.status(400).json({
            message: "email or password is invalid"
        })
    }

    const token = jwt.sign(
        { id: user._id, password: user.username },
        process.env.JWT_SECRETKEY,
        { expiresIn: "1d" }
    )


    res.cookie("token", token)

    res.status(200).json({
        message: "user logged in successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}

/**
 * @name logoutUserController
 * @description Controller for logging out a user , it will take the token from the cookies and blacklist it in the database and clear the cookie from the client
 * @access Public
 * 
 */

const logoutUserController = async (req, res) => {
    const token = req.cookies.token
    if (token) {
        const isTokenBlacklisted = await blacklistModel.findOne({ token })
        if (!isTokenBlacklisted) {
            await blacklistModel.create({
                token: token
            })
        }
    }
    res.clearCookie("token")
    res.status(200).json({
        message: "user logged out successfully"
    })
}


/** 
 * @name getMeController
 * @description Controller for getting the current logged in user details , it will take the user details from the request object and return it to the client
 * @access Private
 * 
 */
const getMeController = async (req, res) => {
    const user = await userModel.findById(req.user.id)
    res.status(200).json({
        message: "user details fetched successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}

module.exports = {
    registerUserController,
    loginUserController,
    logoutUserController,
    getMeController
}


import { User } from "../models/UserSchema.mjs"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

function createToken(payload) {
    return jwt.sign({ payload }, process.env.SECRET_STR, {
        expiresIn: "30d"
    })
}

export const getAll = async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json({
            status: 'success',
        })

    } catch (error) {
        console.log(error)
    }
}
export const signUP = async (req, res) => {
    try {

        const { password, confirmPassword } = req.body
        if (password === confirmPassword) {
            const user = await User.create(req.body)
            const token = createToken(user._id)
            res.cookie('auth', token, {
                httpOnly: false,
                secure: false,
                maxAge: 60000 * 60 * 24 * 15
            });

            res.status(201).json({
                status: 'success',
                token,
                message: 'user created successfully'
            })
        } else {
            return res.status(400).json({
                message: "the password and confirm password does not match"
            })
        }
    } catch (error) {
        error.code == 11000 && res.status(400).json({
            status: 'fail',
            message: 'this email already have account bound with it '
        })
    }
}

export const loginIn = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({
                status: 'fail',
                message: 'please provide email and password'
            })
        }
        const user = await User.findOne({ email }).select('+password')
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({
                status: 'fail',
                message: "no account found with provided email or password could be wrong "
            })
        }
        else {
            res.status(200).json({
                status: 'success',
                token: createToken(user._id)
            })
        }

    } catch (error) {

    }
}
export const getProfile = async (req, res) => {
    try {
        let token = req.headers.authorization
        if (!token || token.includes("null")) {
            return res.status(401).json({ status: 'fail', message: 'not auth' })
        }
        if (token?.startsWith('Bearer')) {
            token = token.split(' ')[1]

            const decoded = jwt.verify(token, process.env.SECRET_STR)
            if (!decoded) {
                return res.status(400).json({ msg: 'invaild token' })
            }

            const user = await User.findById(decoded.payload).exec().then(user => {
                if (user.thumbnailImg == 'noImg') {
                    user.thumbnailImg = `http://localhost:4000/avatar.png`;
                    return user
                }
                else return user
            })
            if (!user) {
                return res.status(404).json({ status: 'fail', message: 'no user found ' })
            }
            else {
                return res.status(200).json({ status: 'success', user })
            }
        }
        else {
            res.status(401).json({
                status: 'fail',
                message: 'you have to login first'
            })
        }
    }
    catch (err) {
        console.log(err)
    }
}
export const updateProfile = async (req, res) => {
    try {
        let token = await req.headers.authorization

        if (token?.startsWith('Bearer')) {

            token = token.split(' ')[1]

            const decoded = jwt.verify(token, process.env.SECRET_STR)
            if (!decoded) {
                return res.status(400).json({ msg: 'invaild token' })

            }
            if (!req.body) {
                console.log('blocked')
                return res.status(400).json({ status: 'fail', message: 'cannt update since nothing sent' })
            }
            const user = await User.findByIdAndUpdate(decoded.payload, req.body, { new: true, runValidators: true })
            if (!user) {
                return res.status(404).json({ status: 'fail', message: 'no user found ' })
            }
            else {
                res.status(200).json({ status: 'success', user })
            }
        }
        else {
            res.status(401).json({
                status: 'fail',
                message: 'you have to login first'
            })
        }
    }
    catch (err) {
        console.log(err)
    }
}

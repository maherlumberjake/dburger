import { Burger } from '../models/BurgerSchema.mjs'
import jwt from 'jsonwebtoken'
import { User } from '../models/UserSchema.mjs'
import fs from 'fs'
import path, { dirname } from 'path'

export const getAllBurgers = async (req, res) => {
    try {
        let burgersCursor = Burger.find()
        //paginartion stuff
        const page = +req.query.page || 1;
        const limit = 5;
        const skip = (page - 1) * limit
        const totalBurgers = await Burger.countDocuments()
        if (skip > totalBurgers) {
            throw new Error('not found')
        }
        burgersCursor = burgersCursor.skip(skip).limit(limit)
        // paginartion stuff
        const data = await burgersCursor

        data.forEach((el) => {
            el.displayImg = `http://localhost:4000/${el.displayImg}`
        })
        console.log(data)
        res.status(200).json({
            totalBurgers,
            status: 'success',
            data,
        })

    } catch (error) {
        console.log(error)
        res.status(404)
    }
}
export const createNew = async (req, res) => {
    console.log(req.file)
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

            let user = await User.findById(decoded.payload)

            const newBurger = await Burger.create({ ...req.body, owner: user, displayImg: req.file.filename })

            if (newBurger) {
                user = await User.findByIdAndUpdate(user._id, { ownedBurgers: [...user.ownedBurgers, newBurger] })
                res.status(201).json({
                    status: 'success',
                    newBurger,
                    msg: 'created successfully'
                })
            }
        }
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
}
export const getBurgerById = async (req, res) => {

    try {
        let burger = await Burger.findById({ _id: req.params.id })
        burger.displayImg = `http://localhost:4000/${burger.displayImg}`
        res.status(200).json({
            status: 'success',
            burger,
        })

    } catch (error) {
        console.log(error)
        res.status(404)
    }
}

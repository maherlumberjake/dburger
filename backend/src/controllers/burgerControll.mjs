import { Burger } from '../models/BurgerSchema.mjs'
import jwt from 'jsonwebtoken'
import { User } from '../models/UserSchema.mjs'
export const getAllBurgers = async (req, res) => {
    try {
        const data = await Burger.find()
        res.status(200).json({
            status: 'success',
            data,
        })

    } catch (error) {
        console.log(error)
    }
}
export const createNew = async (req, res) => {

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

            const newBurger = await Burger.create({ ...req.body, owner: user })

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
    }
}
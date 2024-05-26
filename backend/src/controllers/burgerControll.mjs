import { Burger } from '../models/BurgerSchema.mjs'
import jwt from 'jsonwebtoken'
import { User } from '../models/UserSchema.mjs'


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
        let data = await burgersCursor.populate('owner').exec();
        data = data.map(burger => {
            if (burger.displayImg == 'noImg') {
                burger.displayImg = `http://localhost:4000/burger2.png`;
            } else {
                burger.displayImg = `http://localhost:4000/${burger.displayImg}`;
            }
            return burger;
        });
        if (!data) {
            return res.status(200).json('no burgers yet')
        }
        return res.status(200).json({
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
            const file = req.file?.filename ? req.file.filename : 'noImg'
            const newBurger = await Burger.create({ ...req.body, owner: user, displayImg: file })

            if (newBurger) {
                user = await User.findByIdAndUpdate(user._id, { ownedBurgers: [...user.ownedBurgers, newBurger] })
                return res.status(201).json({
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

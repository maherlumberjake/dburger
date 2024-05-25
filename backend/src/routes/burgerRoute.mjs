import express from 'express'
import { getAllBurgers, createNew, getBurgerById } from '../controllers/burgerControll.mjs'
const router = express.Router()


router.route('/')
    .get(getAllBurgers)
    .post(createNew)
router.route('/:id')
    .get(getBurgerById)
export default router
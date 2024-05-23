import express from 'express'
import { getAllBurgers, createNew } from '../controllers/burgerControll.mjs'
const router = express.Router()


router.route('/')
    .get(getAllBurgers)
    .post(createNew)
export default router
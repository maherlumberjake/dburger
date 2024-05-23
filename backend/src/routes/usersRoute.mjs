import express from 'express'
import { signUP, loginIn, getProfile, updateProfile } from '../controllers/usersControll.mjs'





const router = express.Router()
router.route('/signUp').post(signUP)
router.route('/login').post(loginIn)
router.route('/Profile')
    .get(getProfile)
    .patch(updateProfile)
export default router
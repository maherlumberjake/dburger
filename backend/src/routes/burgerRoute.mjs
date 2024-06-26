import express from 'express'
import { getAllBurgers, createNew, getBurgerById, addComment, likeBurger } from '../controllers/burgerControll.mjs'
const router = express.Router()
import multer from 'multer'



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now().toString(16) + file.originalname)
    }
})
const upload = multer({ storage: storage });
const cpUpload = upload.single('displayImg');

router.route('/')
    .get(getAllBurgers)
    .post(cpUpload, createNew)
router.route('/:id')
    .get(getBurgerById)
    .patch(addComment)
router.route('/like/:id')
    .get(likeBurger)
export default router
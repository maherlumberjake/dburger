import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import { BurgerSchema } from './BurgerSchema.mjs'
export const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name is required'],
        maxLength: [20, 'name cannot have more than 20 ch'],
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: [true, 'this email already have an account bound with it '],

    },
    password: {
        type: String,
        select: false,
        required: [true, 'password is required'],
        minLength: [6, 'password cannot be less than 6 ch']
    },
    confirmPassword: {
        type: String,
        required: [true, 'password is required'],
        minLength: [6, 'confirm password cannot be less than 6 ch']
    },
    thumbnailImg: {
        type: String,
        default: "noImg"
    },
    ownedBurgers: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Burger',
        default: []
    },
    likeList: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Burger',
        default: [],
    }
})
UserSchema.pre('save', async function (next) {
    await bcrypt.hash(this.password, 10).then((newPassword) => {
        this.confirmPassword = undefined
        this.password = newPassword
        next();
    })
});
UserSchema.post('find', function (docs) {
    docs.forEach(doc => {
        if (doc.thumbnailImg === 'noImg') {
            doc.thumbnailImg = `http://localhost:4000/avatar.png`;
        }
    });
});

export const User = mongoose.model('User', UserSchema)
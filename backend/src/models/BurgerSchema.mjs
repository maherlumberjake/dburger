import mongoose from 'mongoose'
import { User } from './UserSchema.mjs'
export const BurgerSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'title is required'],
        maxLength: [30, 'title cannot have more than 30 ch'],
        minLength: [3, 'title cannot be less than 3 ch'],
    },
    description: {
        type: String,
        required: [true, 'description is required'],
        minLength: [5, 'description cannot be less than 5 ch'],
        maxLength: [250, 'description cannot be more than 250 ch']
    },
    likes: {
        type: Number,
        default: 0,

    },
    price: {
        type: Number,
        required: [true, 'price is required'],
        min: 1

    },
    discount: {
        type: Number,
        default: 0,
    },
    kind: {
        type: Boolean,
        required: [true, 'you have to specify if that burger for vergetieran or for non-vegeterian']
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        select: ['-password', '-email', 'confirmPassword']
    },
    displayImg: {
        type: String,
        default: "noImg"
    }
})
BurgerSchema.pre('find', async function () {
    this.populate('owner');
});
BurgerSchema.post('find', function (docs) {
    docs.forEach(doc => {
        if (doc.displayImg == 'noImg') {
            doc.displayImg = `http://localhost:4000/burger2.png`;
        }
    })
})
export const Burger = mongoose.model('Burgers', BurgerSchema)
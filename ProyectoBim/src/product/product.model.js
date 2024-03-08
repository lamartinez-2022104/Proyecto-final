import { Schema, model } from 'mongoose'

const productSchema = Schema({
    name: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true,
    },

    category: {
        type: Schema.ObjectId,
        ref: 'category',
        required: true
    },

    stock: {
        type: Number,
        required: true
    },

    sellCount: {
        type: Number,
        default: 0
    }
},
    {
        versionKey: false
    }
)

export default model('product', productSchema)
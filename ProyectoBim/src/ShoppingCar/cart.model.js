import { Schema, model } from "mongoose";

const cartSchema = Schema({
    items:[{
        type: Schema.ObjectId,
        ref: 'product'
    }],
    totalPrice:{
        type: Number,
        default: 0
    }
},
{
    versionKey: false
})

export default model('cart', cartSchema)
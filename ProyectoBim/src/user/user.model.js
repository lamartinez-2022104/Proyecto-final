'use strict'

import {Schema, model} from 'mongoose'

const userSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    surname:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        minLength: [4, 'Password must be 8 characteres'],
        required: true,
    },
    username:{
        type: String,
        required: true,
        lowerCase: true,
        unique: true
    },
    role:{
        type: String,
        upperCase: true,
        enum: ['ADMIN', 'CLIENT'],
        default: 'CLIENT',
        required: true
    },
    
},
{
    versionKey: false
}
)

export default model('user', userSchema)
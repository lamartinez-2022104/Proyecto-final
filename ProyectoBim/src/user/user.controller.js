'use strict'

import User from './user.model.js'
import {encrypt, checkPassword} from '../utils/validator.js'
import {generateJwt} from '../utils/jwt.js'

export const register = async (req, res) => {
    try {
        let data = req.body
        data.password = await encrypt(data.password)
        data.password = await encrypt(data.password)
        let user = new User(data)
        await user.save()
        return res.status(200).send({message: 'User registered successfully', user})
    } catch (error) {
        console.log(error)
        return res.status(500).send({message: 'Error registering user', error})
    }
}

export const login = async (req, res) => {
    try {
        let {username, email, password} = req.body
        let user = await User.findOne({$or:[{username}, {email}]})
        if (user && (await checkPassword(password, user.password))) {
            let loggedUser = {
                uid: user._id,
                username: user.username,
                name: user.name,
                role: user.role
            }
            let token = await generateJwt(loggedUser)
            return res.status(200).send({message: `Welcome ${user.name}`,loggedUser, token})
        }
        return res.status(401).send({message: 'Invalid username or password'})
    } catch (error) {
        console.log(error)
        return res.status(500).send({message: 'Error logging in', error})
    }
}

export const update = async (req, res)=>{
    try {
        let data = req.body
        if(data.role ==! ['ADMIN', 'CLIENT']) return res.status(404).send({message: 'ROLE Not valid'})
        let user = await User.findByIdAndUpdate(req.params.id, data, {new: true})
        return res.status(200).send({message: 'User updated successfully', user})
    } catch (error) {
        console.log(error)
        return res.status(500).send({message: 'Error updating user', error})
    }
}

export const deleteU = async(req, res)=>{
    try{
        let { id } = req.params
        let deletedUser = await User.findOneAndDelete({_id: id})
        if(!deletedUser) return res.status(404).send({message: 'Account not found and not deleted'})
        return res.send({message: `Account with username ${deletedUser.username} deleted successfully`})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error deleting account'})
    }
}
import { initServer } from './configs/app.js'
import { connect } from './configs/mongo.js'
import Category from './src/category/category.model.js'
import User from './src/user/user.model.js'
import { encrypt } from './src/utils/validator.js'

const defaultUser = async()=>{
    try {
        let existUser = await User.findOne()
        if(!existUser){
            const newUser = new User({
                name: "Antonio",
                surname: "Caal",
                username: "Acaal",
                email: "caal@gmail.com",
                password: "2022104",
                role: "ADMIN"
 
            })
            newUser.password = await encrypt(newUser.password)
            await newUser.save()
            console.log('User default created', newUser)
        }
        return console.log('User default exists')
    } catch (error) {
        console.error(error)
        return error
    }
}
 
const defaultCategory = async()=>{
    try {
        let existCategory = await Category.findOne()
        if(!existCategory){
            let newCategory = new Category({
                name: 'Predeterminado',
                description: 'Default Category'
            })
            await newCategory.save()
            console.log('Category default created', newCategory)
        }
        return console.log('Category default exists')
    } catch (error) {
        console.error(error)
        return error
    }
}

initServer()
connect()
defaultCategory()
defaultUser()
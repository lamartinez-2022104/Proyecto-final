
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import { config } from 'dotenv'
import categoryRoutes from '../src/category/category.routes.js'
import userRoutes from '../src/user/user.routes.js'
import productRoutes from '../src/product/product.routes.js'
import cartRoutes from '../src/ShoppingCar/cart.routes.js'
import billRoutes from '../src/bill/bill.routes.js'

const app = express() 
config()
const port = process.env.PORT || 3200


app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(morgan('dev'))

app.use('/category', categoryRoutes)
app.use('/user', userRoutes)
app.use('/product', productRoutes)
app.use('/cart', cartRoutes)
app.use('/bill', billRoutes)

export const initServer = ()=>{
    app.listen(port)
    console.log(`SERVER HTTP RUNNING IN PORT ${port}`)
}

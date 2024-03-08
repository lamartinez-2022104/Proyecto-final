'use strict'
import Cart from './cart.model.js'
import Product from '../product/product.model.js'

export const getCart = async(req,res)=>{
    try {
        let cart = await Cart.findOne()
        return cart
    } catch (err) {
        console.error(err)
        return res.status(500).send({message:'Cant get cart'})
    }
}

// export const addToCart = async (req,res)=>{
//     try {
//         let id = req.params.id
//         let product = await Product.findById(id)
//         if(!product) return res.status(404).send({message: 'Producto not found'})
//         let cart = await Cart.findOne()
//         cart.items.push(product)
//         cart.totalPrice += product.price
//         await cart.save()
//         return cart
//     } catch (err) {
//         console.error(err)
//         return res.status(500).send({message: 'Error adding to cart '})
//     }
// }

export const addToCart = async (req, res) => {
    try {
        let id = req.params.id
        let product = await Product.findById(id)
        if (!product) return res.status(404).send({ message: 'Producto not found' })

        let cart = await Cart.findOne()

        // Si no hay carrito, crea uno nuevo
        if (!cart) {
            cart = new Cart();
        }

        cart.items.push(product)
        cart.totalPrice += product.price
        await cart.save()
        // Devuelve una respuesta indicando que el producto se agregó correctamente al carrito
        return res.status(200).send({ message: 'Product added to cart successfully', cart: cart, product: product.price})
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error adding to cart ' })
    }
}

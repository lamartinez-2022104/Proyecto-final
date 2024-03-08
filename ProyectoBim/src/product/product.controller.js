'use stric'

import Product from './product.model.js'
import mongoose from 'mongoose'

export const save = async (req, res) => {
    try {
        let data = req.body
        let product = new Product(data)
        await product.save()
        return res.send({ message: 'Product saved successfully' })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error saving Product', err })
    }
}

export const update = async (req, res) => {
    try {
        let { id } = req.params
        let data = req.body
        let updateProduct = await Product.findOneAndUpdate(
            { _id: id },
            data,
            { new: true }
        )
        return res.send({ message: 'Product update successfully', updateProduct })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error updating' })
    }
}

export const deleteP = async (req, res) => {
    try {
        let { id } = req.params
        let deletedProduct = await Product.deleteOne({ _id: id })
        if (deletedProduct.deletedCount == 0) return res.status(404).send({ message: 'Product not found, not deleted' })
        return res.send({ message: 'Deleted Product Successfully' })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error deleting product' })
    }
}

export const get = async (req, res) => {
    try {
        let productos = await Product.find()
        return res.send({ productos })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error getting products' })
    }
}

export const ceroStock = async (req, res) => {
    try {
        let data = await Product.findOne({ stock: 0 }).populate('category')
        if (!data) {
            return res.status(444).send({ message: 'No out-of-stock products' })
        }
        return res.send({ data })
    } catch (err) {
        console.error(err)
    }
}

export const getProductsByCategory = async (req, res) => {
    try {
        let { id } = req.params
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({ message: 'INVALID CATEGORY' })
        }
        let products = await Product.find({ category: id })
        return res.send(products)
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error retrieving products by category', error: error })
    }
}

export const search = async (req, res) => {
    try {
        let { category, name } = req.body
        let products

        if (!name) {
            products = await Product.find({ category: category }).populate('category', ['name', 'description'])
            return res.send(products)
        }

        if (!category) {
            const product = await Product.find({ name: name }).populate('category', ['name', 'description'])
            return res.send(product)
        }
        product = await Product.find({name: name, category: category})
    } catch (err) {
        console.error(err)
        res.status(500).send({ message: 'Error Searching products' })
    }
}

export const mostBuyings = async(req, res) => {
    try {
        let products = await Product.find().sort({ sellCount: -1 }).populate('category', ['name', 'description'])
        return res.send({ message: 'These are the products sorted by best sellers', products})
    } catch (error) {
        console.error(error)    
        res.status(500).send({ message: 'Error displaying bestSellers' })
    }
}
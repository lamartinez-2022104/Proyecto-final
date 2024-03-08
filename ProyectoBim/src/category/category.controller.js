'use strict'

import Category from '../category/category.model.js'
import Product from '../product/product.model.js'

export const save = async (req, res) => {
    try {
        let data = req.body
        let category = new Category(data)
        await category.save()
        return res.send({ message: 'Category saved succesfully' })
    } catch (error) {
        console.error(err)
        return res.status(500).send({ message: 'Error saving category', err })
    }
}

export const update = async (req, res) => {
    try {
        let data = req.body
        let { id } = req.params
        let updatedCategory = await Category.findOneAndUpdate(
            { _id: id },
            data,
            { new: true }
        )
        if (!updatedCategory) return res.status(401).send({ message: 'Category not found and not updated' })
        res.send({ message: 'Updated category', updatedCategory })
    } catch (error) {
        res.status(500).send({ error: 'Internal server error' })
    }
}


export const deleteC = async (req, res) => {
    try {
        let { id } = req.params;
        let deletedCategory = await Category.deleteOne({ _id: id })
        if (!deletedCategory) return res.status(404).send({ message: 'Category not found, not deleted' });
        let defaultCategory = await Category.findOne({ name: 'Predeterminado' });
        await Product.updateMany({ category: id }, { category: defaultCategory._id });
        res.send({ message: 'Successfully deleted Category' });
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error deleting category' })
    }
};



export const get = async (req, res) => {
    try {
        let categorias = await Category.find()
        return res.send({ categorias })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error getting categorys' })
    }
}



export const getCategoryById = async (req, res) => {
    try {
        let category = await Category.findById(req.params.id)
        if (!category) {
            return res.status(404).send({ error: 'Category not found' })
        }
        res.send(category)
    } catch (error) {
        res.status(500).send({ error: 'Internal server error' })
    }
}
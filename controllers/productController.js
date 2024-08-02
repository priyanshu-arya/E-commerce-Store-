const Product = require('../models/Product')

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find()
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({ error: 'Server error'})
    }
}

exports.addProduct = async (req, res) => {
    const { name, description, price, category, image, stock } = req.body
    try {
        const product = new Product({ name, description, price, category, image, stock })
        await product.save()
        res.status(201).json(product)
    }  catch (error) {
        res.status(500).json({ error: 'Server error'})
    }
}
const Product = require('../models/Product')
const User = require('../models/User')

exports.addToCart = async (req, res) => {
    const { productId } = req.body
    try {
        const user = await User.findById(req.user.userId)
        user.cart.push(productId)
        await user.save()
        res.status(200).json(user.cart)
    } catch (error) {
        res.status(500).json({ error: 'Server error'})
    }
}

exports.getCart = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).populate('cart')
        res.status(201).json(user.cart)
    }  catch (error) {
        res.status(500).json({ error: 'Server error'})
    }
}
const Order = require('../models/Order')
const User = require('../models/User')

exports.placeOrder = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).populate('cart')
        const order = new Order({
            user: user._id,
            products: user.cart.map(product => ({ product: product._id, quantity: 1})),
            total: user.cart.reduce((acc, product) => acc + product.price, 0) 
        })
        await order.save()
        user.orders.push(order._id)
        user.cart = []
        await user.save()
        res.status(200).json(order)
    } catch (error) {
        res.status(500).json({ error: 'Server error'})
    }
}

exports.getOrder = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).populate('orders')
        res.status(201).json(user.orders)
    }  catch (error) {
        res.status(500).json({ error: 'Server error'})
    }
}
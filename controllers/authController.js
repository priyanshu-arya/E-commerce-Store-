const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config/keys')

exports.register = async(req, res) => {
    const { username, email, password } = req.body
    try {
        const user = new User({username, email, password: bcrypt.hashSync(password, 10)})
        await user.save()
        res.status(201).json({message: 'user registered successful'})
    } catch (error) {
        res.status(500).json({ error: 'Server Error'})
    }
}

exports.login = async (req, res) => {
    const { email, password } = req.body
    try{
        const user = await User.findOne({ email })
        if( user && bcrypt.compareSync(password, user.password)){
            const token = jwt.sign({ userId: user._id }, config.jwtSecret, {expiresIn: '1h'})
            res.status(200).json({ token })
        } else {
            res.status(401).json({ error: 'Invalid Credentials '})
        }

    } catch(error){
        res.status(500).json({ error: 'Server Error'})
    }
}
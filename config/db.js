const mongoose = require('mongoose')
const config = require('./keys')

const connectDB = async () => {
    try{
        await mongoose.connect(config.mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        console.log('MongoDB Connected .....')

    } catch (error) {
        console.error(error.message)
        process.exit(1)
    }
}

module.exports = connectDB
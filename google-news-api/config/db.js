const mongoose = require('mongoose')
const dotenv = require('dotenv')
const updater = require('../utils/google-news')

dotenv.config({path: './config/config.env'})

const connectDB = async () => {
   const conn = await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false, useUnifiedTopology: true})
   console.log(('Mongo DB connected: ' + conn.connection.host))
   await updater.update()

}

module.exports = connectDB
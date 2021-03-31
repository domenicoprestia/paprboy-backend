const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const connectDB = require('./config/db')
const colors = require('colors')
const errorHandler = require('./middleware/error')

dotenv.config({path: './config/config.env'})

connectDB()

const articles = require('./routes/articles')
const users = require('./routes/user')

const app = express()

app.use(express.json())

if(process.env.NODE_ENV === "development"){
   app.use(morgan('dev'))
}

app.use('/api/v1/articles', articles)
app.use('/api/v1/user', users)

app.use(errorHandler)

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
   console.log(('Server running on port: ' + process.env.PORT + ', in mode: ' + process.env.NODE_ENV).yellow.bold)
})

process.on('unhandledRejection', (err, promise) =>{
   console.log(('Error: ' + err).red)
})
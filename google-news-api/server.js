const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const colors = require('colors')
const { connect } = require('mongoose')

dotenv.config({path: './config/config.env'})

connectDB()

const app = express()

const PORT = process.env.PORT || 5000

const server = app.listen(PORT, () => {
   console.log(('Server running on port: ' + process.env.PORT + ', in mode: ' + process.env.NODE_ENV).yellow.bold)
})


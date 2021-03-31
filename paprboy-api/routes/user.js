const { response } = require('express')
const express = require('express')
const router = express.Router()
const User = require('../models/User')
const {createUser, loginUser, getNews} = require('../controllers/users')
const verify = require('../middleware/verifyToken')


router.post('/register', createUser)

router.post('/login', loginUser)

router.get('/getnews', verify, getNews)

module.exports = router
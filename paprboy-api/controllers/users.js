const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const User = require('../models/User')
const Article = require('../models/Article')
const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')
const {registerValidation, loginValidation} = require('../middleware/validation')
dotenv.config({path: './config/config.env'})

//@desc creates a user
//@route POST /api/v1/user/register
//@access public 

exports.createUser = asyncHandler(async (req, res, next) => {

   //register validation
   const {error} = registerValidation(req.body)
   if(error) res.status(400).json({success: false, message: error.details[0].message})

   //check if email or username is duplicate
   const emailExist = await User.findOne({email: req.body.email})
   if(emailExist) return res.status(400).json({success: false, message: 'Email already taken'})

   const usernameExist = await User.findOne({username: req.body.username})
   if(usernameExist) return res.status(400).json({success: false, message: 'Username already taken'})

   //Hash passwords
   const salt = await bcrypt.genSalt(10);
   req.body.password = await bcrypt.hash(req.body.password, salt)

   //create new user
   const user = await User.create(req.body)
   res.status(200).json({success: true, user: user.username, email: user.email })
})

//@desc creates as a user
//@route POST /api/v1/user/login
//@access public 

exports.loginUser = asyncHandler(async (req,res, next) =>{
const {error} = loginValidation(req.body)
if (error) return res.status(400).send(error.details[0].message)

//check if email or username is duplicate
const user = await User.findOne({username: req.body.username})
if(!user) return res.status(400).json({success: false, message: 'Username or Password wrong'})

//Password correct
const validPass = await bcrypt.compare(req.body.password, user.password)
if(!validPass) return res.status(400).send('Username or password wrong')

//Create and assing a token
const token = jwt.sign({_id: user.id}, process.env.SECRET_TOKEN)
res.header('auth-token', token).send(token)

res.send('Logged in!')
})

//@desc gets the preferred news of a user
//@route GET /api/v1/user/getnews
//@access private 

exports.getNews = asyncHandler(async (req,res,next) => {
   const user = await User.findById(req.user._id)
   let lans 
   let prefs
   if(user.language){
       lans = user.language.split(',')
   }

   if(user.preferences){
       prefs = user.preferences.split(',')
   }

   console.log(lans, prefs)

   const articles = await Article.find({language: lans, type: prefs})
   res.status(200).json({success: true,count: articles.length, data: articles})
})
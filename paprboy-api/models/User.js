const mongoose = require('mongoose')
const Article = require('./Article')

const UserSchema = new mongoose.Schema({
   username: {
      type: String, 
      required: [true, 'Please insert a name'],
      min: 6,
      max: 255
   },
   email:{
      type: String, 
      required: [true, 'Please insert an email'], 
      max: 255,
      min: 6
   },
   password:{
      type: String,
      required: [true, 'Please insert a password'],
      max: 1024,
      min:6
   },
   date:{
      type: Date,
      default: Date.now
   },
   language:{
      type: String, 
      required: true,
      enum: ['italian', 'usa', 'usa,italian']
   },
   preferences:{
      type: String, 
      required: true
   },
   savedArticles:{
      type: Array
   }
})


module.exports = mongoose.model('User', UserSchema)
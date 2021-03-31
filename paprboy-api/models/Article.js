const mongoose = require('mongoose')

const ArticleSchema = new mongoose.Schema({
   header: {
      type: String,
      required: true
   },
   link:{
      type: String,
      required: true
   },
   type:{
      type: String,
      required: true
   },
   language:{
      type: String,
      required: true
   },
   createdAt:{
      type: Date,
      default: Date.now
   },
   shares:{
      type: Number,
      default: 0
   },
   saves:{
      type: Number,
      default: 0
   }
})

module.exports = mongoose.model('Article', ArticleSchema)
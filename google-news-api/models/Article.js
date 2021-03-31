const mongoose = require('mongoose')
const slugify = require('slugify')

const ArticleSchema = new mongoose.Schema({
   header: {
      type: String,
      required: true
   },
   slug:String,
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



ArticleSchema.pre('save', function(){
   charlist=['à','ò','ù','ì','è']
   this.slug = slugify(this.header, {lower:true})
   this.slug.replace(new RegExp("[" + charlist + "]+$"), "")
   this.slug.replace(/'/, "")
   this.slug.replace(/\\/, "")
})


module.exports = mongoose.model('Article', ArticleSchema)
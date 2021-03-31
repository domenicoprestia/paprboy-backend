const Article = require('../models/Article')
const User = require('../models/User')
const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')

//@desc get all articles
//@route GET /api/v1/articles
//@access public 

exports.getArticles = asyncHandler(async (req, res, next) => {
   let query;
   const reqQuery = {...req.query}
   const removeFields = ['select', 'sort', 'page', 'limit']
   removeFields.forEach(field => {
      delete reqQuery[field]
   })

   if(reqQuery.language)   if(reqQuery.language.includes(',')){
      let langs = reqQuery.language.split(',')
      reqQuery.language = langs
   }

   if(reqQuery.type) if(reqQuery.type.includes(',')){
      let types = reqQuery.type.split(',')
      reqQuery.type = types
   }

   let queryStr = JSON.stringify(reqQuery)

   
   queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => '$' + match)
   
   query = Article.find(JSON.parse(queryStr))
   
   if(req.query.select){
      const fields = req.query.select.split(',').join(' ')
      query = query.select(fields)
   }

   if(req.query.sort){
      const sortBy = req.query.sort.split(',').join(' ')
      query = query.sort(sortBy)
   }else{
      query = query.sort('-createdAt')
   }

if(req.query.page){
   const page = parseInt(req.query.page, 10) || 1
   const limit = parseInt(req.query.page, 10) || 100
   const startIndex = (page-1)*limit
   const endIndex = page*limit
   const total = await Article.countDocuments()

   query.skip(startIndex)
   query.limit(limit)
 
   const articles = await query

   const pagination = {}

   if(endIndex < total){
      pagination.next = {
         page: page + 1,
         limit
      }
   }else{

   }
   if(startIndex > 0){
      pagination.prev = {
         page: page -1,
         limit
      }
   }

   res.status(200).json({success: true, count: articles.length, pagination: pagination, data: articles})
}

   const articles = await query 
   res.status(200).json({success: true, count: articles.length, data: articles})
})

exports.setSave = asyncHandler(async (req, res, next) => {
   const article = await Article.findOne({'slug': req.params.slug})
   article.saves = article.saves+1
   await Article.findByIdAndUpdate(article._id, article, {new: true, runValidators: true})
   const user = await User.findById(req.user._id)
   user.savedArticles.push(article)
   await User.findByIdAndUpdate(user._id, user)
   res.status(200).json({success: true, data: article})
})

exports.setShare = asyncHandler(async (req, res, next) => {
   const article = await Article.findOne({'slug': req.params.slug})
   article.shares = article.shares+1
   const articleModified = await Article.findByIdAndUpdate(article._id, article, {new: true, runValidators: true})
   res.status(200).json({success: true, data: article})
})

exports.getTopShared = asyncHandler(async (req, res, next) => {
   let query;
   const reqQuery = {...req.query}
   const removeFields = ['page', 'limit']
   removeFields.forEach(field => {
      delete reqQuery[field]
   })
      query = Article.find(reqQuery)
      query = query.sort('-shares')

      let articles = await query
      articles = articles.slice(0,50)
      res.status(200).json({success: true, count: articles.length, data: articles})
})

exports.getTopSaved = asyncHandler(async (req, res, next) => {
   let query;
   const reqQuery = {...req.query}
   const removeFields = ['page', 'limit']
   removeFields.forEach(field => {
      delete reqQuery[field]
   })
      query = Article.find(reqQuery)
      query = query.sort('-saves')

      let articles = await query
      articles = articles.slice(0,50)
      res.status(200).json({success: true, count: articles.length, data: articles})
})

exports.setUnsaved = asyncHandler(async (req,res,next) => {
   const article = await Article.findOne({'slug': req.params.slug})
   article.saves = article.saves-1
   await Article.findByIdAndUpdate(article._id, article, {new: true, runValidators: true})
   const user = await User.findById(req.user._id)
   const newSavedArticles = user.savedArticles.filter((article) => {
      return article.slug != req.params.slug
   })
   user.savedArticles = newSavedArticles
   await User.findByIdAndUpdate(user._id, user)
   res.status(200).json({success: true, data: article})
})
const express = require('express')
const verify = require('../middleware/verifyToken')

const {getArticles, setSave, setShare, getTopSaved, getTopShared, setUnsaved} = require('../controllers/articles')

const router = express.Router()

router.get('/topsaved', getTopSaved)
router.get('/topshared', getTopShared)
router.get('/', getArticles)

router.put('/:slug/save', verify, setSave)
router.put('/:slug/share', verify, setShare)
router.put('/:slug/unsave', verify, setUnsaved)

module.exports = router
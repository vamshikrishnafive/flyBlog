const express = require('express')
const router = express.Router()

//controller's
const homePageController = require('../controllers/homePage')
const createPostController = require('../controllers/createPost')
const storePostController = require('../controllers/storePost')
const getPostController = require('../controllers/getPost')

//middleware's
const storePost = require('../middleware/storePost')
const auth = require('../middleware/auth')

router.get('/', homePageController)
router.get('/posts/new', auth, createPostController)
router.post('/posts/store',auth, storePost,storePostController)
router.get('/post/:id', getPostController)

module.exports = router;
const express = require('express')
const router = express.Router();
 
//controller's
const createUserController = require('../controllers/createUser')
const stroeUserController = require('../controllers/storeUser')
const loginUserController = require('../controllers/loginUser')

//middleware's
const auth = require('../middleware/auth')
const redirectIfAuthenticted = require('../middleware/redirectIfAuthenticated')

router.post('/user/login',redirectIfAuthenticted,loginUserController)
router.post('/user/register', redirectIfAuthenticted, stroeUserController)
router.get('/auth/register',redirectIfAuthenticted, createUserController)

module.exports = router;
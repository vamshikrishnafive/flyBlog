const express = require('express')
const router = express.Router();

//controller's
const logoutcontroller = require('../controllers/logout')
const logincontroller = require('../controllers/login')
const aboutPagecontroller = require('../controllers/aboutPagecontroller')


//middleware's
const auth = require('../middleware/auth')
const redirectIfAuthenticted = require('../middleware/redirectIfAuthenticated')

router.get((req,res) => res.render('pageNotFound'))
router.get('/auth/logout',auth,logoutcontroller)
router.get('/auth/login',redirectIfAuthenticted,logincontroller)
router.get('/about',aboutPagecontroller)

module.exports = router;
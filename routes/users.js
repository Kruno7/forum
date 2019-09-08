const express = require('express')
const router  = express.Router()

const checkAuth = require('../middleware/check-auth')
const UserController = require('../controllers/users')


router.post('/signup',  UserController.user_signup) 
router.post('/login', UserController.user_login)
router.post('reset-password', checkAuth, UserController.user_resetpassword)

module.exports = router


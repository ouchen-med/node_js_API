const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController')
//get all users:
router.route('/')
    .get(usersController.getAllUsers)
   
//register:
router.route('/regester')
     .post(usersController.register)
//login
router.route('/login')
     .post(usersController.login)

  

module.exports = router

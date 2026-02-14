const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const verifyToken = require('../middlewares/verifyToken');
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
//get all users:
router.route('/')
    .get(verifyToken,usersController.getAllUsers)
   
//register:
router.route('/regester')
     .post(upload.single('avatar'),usersController.register)
//login
router.route('/login')
     .post(usersController.login)

  

module.exports = router

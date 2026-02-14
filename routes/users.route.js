const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const verifyToken = require('../middlewares/verifyToken');
const multer = require('multer')
const path = require('path');

//
const diskStorage = multer.diskStorage({
     destination: function (req, file, cb) {
          cb(null,'uploads')
     },
     filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
          const fileName = `user-${Date.now()}${ext}`;
          cb(null, fileName);
     }
})
const fileFilter = (req, file, cb) => {
     const allowedTypes = ['.png', '.jpg', '.jpeg', '.webp'];
     const ext = path.extname(file.originalname).toLowerCase();

     if (allowedTypes.includes(ext)) {
          cb(null, true);
     } else {
          cb(new Error('Only .png, .jpg, .jpeg, .webp allowed'), false);
     }
};
const upload = multer({
     storage: diskStorage,
     fileFilter: fileFilter,
})
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

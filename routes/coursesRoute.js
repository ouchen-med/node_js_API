const express = require('express');
const router = express.Router();
const coursesController = require('../controllers/coursesController')
const validationShema = require('../middlewares/validatinSchema');
const verifyToken = require('../middlewares/verifyToken');
const userRoles = require('../utils/ruserRols');
const allowedTo = require('../middlewares/allowedTo');

//courses Routes:
router.route('/')
  .get(verifyToken,allowedTo(userRoles.USER,userRoles.ADMIN,userRoles.MANAGER),coursesController.getAllCourses)

  .post(verifyToken,allowedTo(userRoles.ADMIN, userRoles.MANAGER),validationShema(),coursesController.addCourse)

router.route('/:courseId')
  .get(verifyToken,allowedTo(userRoles.USER,userRoles.ADMIN,userRoles.MANAGER),coursesController.getCourse)
  .patch(verifyToken,allowedTo(userRoles.ADMIN,userRoles.MANAGER),coursesController.updateCourse)
  .delete(verifyToken, allowedTo(userRoles.ADMIN) ,coursesController.delteCourse)


  

module.exports = router

const express = require('express');
const router = express.Router();
const coursesController = require('../controllers/coursesController')
const validationShema = require('../middlewares/validatinSchema');
const verifyToken = require('../middlewares/verifyToken');
const userRoles = require('../utils/ruserRols');
const allowedTo = require('../middlewares/allowedTo');

//courses Routes:
router.route('/')
  .get(coursesController.getAllCourses)

  .post(verifyToken,validationShema(),coursesController.addCourse)

router.route('/:courseId')
  .get(coursesController.getCourse)
  .patch(coursesController.updateCourse)
  .delete(verifyToken, allowedTo(userRoles.ADMIN) ,coursesController.delteCourse)


  

module.exports = router

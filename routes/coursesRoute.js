const express = require('express');
const router = express.Router();
const coursesController = require('../controllers/coursesController')
const validationShema = require('../middlewares/validatinSchema');
const verifyToken = require('../models/verifyToken');

//courses Routes:
router.route('/')
  .get(coursesController.getAllCourses)
  .post(verifyToken,validationShema(),coursesController.addCourse)

router.route('/:courseId')
  .get(coursesController.getCourse)
  .patch(coursesController.updateCourse)
  .delete( coursesController.delteCourse)


  

module.exports = router

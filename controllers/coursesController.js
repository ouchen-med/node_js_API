const { validationResult } = require('express-validator');
const Course = require('../models/course.model');
const httpStatusText = require('../utils/httpStatusText');
const asyncWrapper = require('../middlewares/asyncWrapper');

const AppError = require('../utils/AppError')

const getAllCourses = asyncWrapper(async (req, res) => {
  const query = req.query;
  const limit = query.limit || 10;
  const page = query.page || 1;
  const skip = (page - 1) * limit;
  try {
    const courses = await Course.find({}, { "__v": false }).limit(limit).skip(skip);

    res.status(200).json({
      status: httpStatusText.SUCCESS,
      data: { courses }
    });

  } catch (error) {
    res.status(500).json({
      status: httpStatusText.ERROR,
      message: "Error fetching courses",
      code: 500
    });
  }
});

const getCourse = asyncWrapper(
  async (req, res,next) => {
    const course = await Course.findById(req.params.courseId);
 if (!course) {
  const error = new AppError('Course Not Found', 404, httpStatusText.FAIL);
  return next(error);  
}
    return res.status(200).json({
      status: httpStatusText.SUCCESS,
      data: { course }
    });
  });

const addCourse = asyncWrapper(async (req, res,next) => {
  
  const errors = validationResult(req);

 if (!errors.isEmpty()) {
  const error = new AppError(
    'Validation Error',
    400,
    httpStatusText.FAIL,
    errors.array()
  );
  return next(error);
}


  const newCourse = new Course(req.body);
  await newCourse.save();

  res.status(201).json({
    status: httpStatusText.SUCCESS,
    data: { course: newCourse }
  });
});

const updateCourse = async (req, res) => {
  try {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: httpStatusText.FAIL,
        errors: errors.array()
      });
    }

    const { courseId } = req.params;

    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      { $set: req.body },
      { new: true, runValidators: true } 
    );

    if (!updatedCourse) {
      return res.status(404).json({ 
        status: httpStatusText.FAIL,
        message: "Course not found"
      });
    }

    res.status(200).json({
      status: httpStatusText.SUCCESS,
      data: { course: updatedCourse }
    });
    
  } catch (error) {
    res.status(400).json({
      status: httpStatusText.ERROR,
      message: error.message || "Invalid Course ID"
    });
  }
};

const delteCourse = async (req, res) => { 
  try {
    const { courseId } = req.params;

    const course = await Course.findByIdAndDelete(courseId);

    if (!course) {
      return res.status(404).json({
        status: httpStatusText.FAIL,
        message: "Course not found"
      });
    }

    res.status(200).json({
      status: httpStatusText.SUCCESS,
      data: null,
      message: "Course deleted successfully"
    });

  } catch (error) {
    res.status(400).json({
      status: httpStatusText.ERROR,
      message: "Invalid course ID"
    });
  }
};

module.exports = {
  getAllCourses,
  getCourse,
  addCourse,
  updateCourse,
  delteCourse 
};
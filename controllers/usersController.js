const asyncWrapper = require("../middlewares/asyncWrapper");
const User = require('../models/user.model');
const httpStatusText = require('../utils/httpStatusText');
const AppError = require('../utils/AppError');
const bcrypt = require('bcryptjs');
const generateJWT = require("../utils/generateJWT");
require('dotenv').config();








const getAllUsers = asyncWrapper(async (req, res) => {
  const query = req.query;
  const limit = query.limit || 10;
  const page = query.page || 1;
  const skip = (page - 1) * limit;
  try {
    const Users = await User.find({}, { "__v": false ,password: false}).limit(limit).skip(skip);

    res.status(200).json({
      status: httpStatusText.SUCCESS,
      data: { Users }
    });

  } catch (error) {
    res.status(500).json({
      status: httpStatusText.ERROR,
      message: "Error fetching courses",
      code: 500
    });
  }
});

const register = asyncWrapper(async (req, res,next) => {
    const { firstName, lastName, email, password } = req.body;
    const oldUser = await User.findOne({ email: email });
    if (oldUser) {
        return next(new AppError('Email already exists!', 400, httpStatusText.FAIL));
  }
    //password ahching bcryptjs ??
        const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword
    })
  

  //generate JWT token??
  const token = await generateJWT({email: newUser.email, id: newUser._id})
  newUser.token = token;
  
    await newUser.save();
   res.status(201).json({
       status: httpStatusText.SUCCESS,
       data: { user: newUser }
     });
    
});
 

const login = asyncWrapper(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Email and password are required!', 400, httpStatusText.FAIL));
  }

  const user = await User.findOne({ email });
  if (!user) {
    return next(new AppError('User not found with this email!', 401, httpStatusText.FAIL));
  }

  const matchPassword = await bcrypt.compare(password, user.password);
  if (!matchPassword) {
    return next(new AppError('Incorrect password!', 401, httpStatusText.FAIL));
  }

  //token ??? JWT
   const token = await generateJWT({email: user.email, id: user._id})
  res.status(200).json({
    status: httpStatusText.SUCCESS,
    data: { token }
  });
});


module.exports = {
    getAllUsers,
    register,
    login
}
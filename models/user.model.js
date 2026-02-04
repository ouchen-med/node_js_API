const mongoose = require('mongoose');
const validator = require('validator');
const userRoles = require('../utils/ruserRols');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
         type: String,
        required: true
    },
    email: {
         type: String,
        unique: true,
        required: [true, 'Email is required'],
        validate: [validator.isEmail, 'Email must be a valid email address']

    },
    password: {
        type: String,
        required: [true, 'Password is required']

    },
    token: {
        type: String,
    },
    role:{
        type: String, //[USER,ADMIN,MANAGER]
        enum: [userRoles.USER, userRoles.ADMIN, userRoles.MANAGER],
        default: userRoles.USER
    },
    avatar: {
    type: String, 
    default: '../uploads/profile.jpg'
  }
    
})

module.exports = mongoose.model('User', userSchema);
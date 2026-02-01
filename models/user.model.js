const mongoose = require('mongoose');
const validator = require('validator');

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

    }
    
})

module.exports = mongoose.model('User', userSchema);
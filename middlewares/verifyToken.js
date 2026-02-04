const jwt = require('jsonwebtoken');
const httpStatusText = require('../utils/httpStatusText');
const AppError = require('../utils/AppError');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'] || req.headers['Authorization'];

  if (!authHeader) {
    return next(new AppError('Authentication token is required', 401, httpStatusText.FAIL));
  }

  if (!authHeader.startsWith('Bearer ')) {
    return next(new AppError('Invalid authorization header format', 401, httpStatusText.FAIL));
  }

  const token = authHeader.split(' ')[1];

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.currentUser = decodedToken;
    return next();
  } catch (err) {
    let errorMessage = 'Invalid token';
    let statusCode = 401;
    
    if (err.name === 'TokenExpiredError') {
      errorMessage = 'Token has expired. Please login again.';
      
    } else if (err.name === 'JsonWebTokenError') {
      errorMessage = 'Invalid token signature';
    }
    
    return next(new AppError(errorMessage, statusCode, httpStatusText.FAIL));
  }
};

module.exports = verifyToken;
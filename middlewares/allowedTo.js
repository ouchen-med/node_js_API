const AppError = require("../utils/AppError");

module.exports = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.currentUser.role)) {
      return next(
        new AppError("This role is not authorized", 403)
      );
      
    }
    next();
  };
};

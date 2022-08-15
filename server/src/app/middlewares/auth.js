const ErrorHander = require('../../utils/errorhander');
const jwt = require('jsonwebtoken');
const User = require('../model/User');

exports.isAuthenticatedUser = async (req, res, next) => {
   const authHeader = req.header('Authorization');
   const token = (authHeader && authHeader.split(' ')[1]) || req.cookies.token;

   if (!token) {
      return next(new ErrorHander('Please Login first'), 401);
   }

   try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

      const userFind = await User.findById(decoded.userId).lean();

      req.user = userFind;

      next();
   } catch (e) {
      console.log(e);
      return next(new ErrorHander('Invalid Token'), 403);
   }
};

exports.authorizeRole = (...roles) => {
   return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
         console.log(req.user);
         return next(
            new ErrorHander(
               `Role: ${req.user.role} is not allowed to access this resouce`,
               403,
            ),
         );
      }

      next();
   };
};

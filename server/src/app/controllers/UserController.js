const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const cloundinary = require('cloudinary');

const User = require('../model/User');
const ErrorHander = require('../../utils/errorhander');
const sendToken = require('../../utils/sendToken');
const sendEmail = require('../../utils/sendEmail');

class UserController {
   register = async (req, res, next) => {
      try {
         const myCloud = await cloundinary.v2.uploader.upload(req.body.avatar, {
            folder: 'avatars',
            width: 150,
            crop: 'scale',
         });

         const { name, email, password } = req.body;

         const userFind = await User.findOne({ email: email });

         if (userFind) {
            return next(new ErrorHander('Email already taken', 401));
         }

         const hashedPassword = await argon2.hash(password);

         const user = await User({
            name,
            email,
            password: hashedPassword,
            avatar: {
               public_id: myCloud.public_id,
               url: myCloud.secure_url,
            },
         });

         await user.save();

         const accessToken = jwt.sign(
            { userId: user._id },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: process.env.JWT_EXPIRE },
         );
         sendToken(user, accessToken, res);
         // res.json({ success: true, user, accessToken });
      } catch (e) {
         return next(new ErrorHander(e, 400));
      }
   };

   login = async (req, res, next) => {
      try {
         const { email, password } = req.body;

         const userFind = await User.findOne({ email: email }).select(
            '+password',
         );

         if (!userFind) {
            return next(new ErrorHander('User not Found', 402));
         }

         const passwordValid = await argon2.verify(userFind.password, password);

         if (!passwordValid) {
            return next(new ErrorHander('Password not Right', 402));
         }

         const accessToken = jwt.sign(
            { userId: userFind._id },
            process.env.ACCESS_TOKEN_SECRET,
         );
         sendToken(userFind, accessToken, res);
      } catch (e) {
         return next(new ErrorHander(e, 400));
      }
   };

   logout = async (req, res, next) => {
      try {
         res.cookie('token', null, {
            expires: new Date(Date.now()),
            httpOnly: true,
         });

         res.json({
            success: true,
            message: 'logout User',
         });
      } catch (e) {
         return next(new ErrorHander(e, 401));
      }
   };

   forgetPassword = async (req, res, next) => {
      const { email } = req.body;
      const random = Math.floor(Math.random() * 100000000000000000);
      const requestPasswordUrl = `http://localhost:4000/auth/password/reset/${random}`;

      const message = `Your password reset token is :- \n\n ${requestPasswordUrl} \n\n If you have not requested this email then, please ignore it`;

      try {
         let user = await User.findOne({ email: email });

         if (!user) {
            return next(new ErrorHander('User not Found', 402));
         }

         user = await User.findOneAndUpdate(
            { email: email },
            {
               resetPasswordToken: random,
            },
            { new: true },
         );

         await sendEmail({
            email: user.email,
            subject: `Reset Password`,
            message,
         });

         res.json({
            success: true,
            message: `Email sent to ${user.email}`,
         });
      } catch (e) {
         return next(new ErrorHander(e, 401));
      }
   };

   resetPassword = async (req, res, next) => {
      const { password, confirmPassword } = req.body;
      const tokenReset = req.params.token;
      console.log(tokenReset);
      if (!tokenReset) {
         return next(new ErrorHander('No token found', 404));
      }

      if (password !== confirmPassword) {
         return next(new ErrorHander('Password not match', 404));
      }

      try {
         let user = await User.findOne({ resetPasswordToken: tokenReset });

         if (!user) {
            return next(
               new ErrorHander('Token reset do not match each other', 404),
            );
         }
         const hashedPassword = await argon2.hash(password);

         user = await User.findOneAndUpdate(
            { email: user.email },
            {
               resetPasswordToken: null,
               password: hashedPassword,
            },
            { new: true },
         );
         res.json({
            success: true,
            message: 'Update Password complete',
         });
      } catch (e) {
         return next(new ErrorHander(e, 401));
      }
   };

   getUserDetails = async (req, res, next) => {
      try {
         const user = await User.findById(req.user._id).lean();

         res.json({
            success: true,
            user,
         });
      } catch (e) {
         return next(new ErrorHander(e, 401));
      }
   };

   updatePassword = async (req, res, next) => {
      const { password, confirmPassword, oldPassword } = req.body;

      if (password !== confirmPassword) {
         return next(new ErrorHander('Password not match', 403));
      }

      try {
         let user = await User.findById(req.user._id)
            .select('+password')
            .lean();

         const passwordValid = await argon2.verify(user.password, oldPassword);

         if (!passwordValid) {
            return next(new ErrorHander('Old password is not match', 404));
         }

         const hashedPassword = await argon2.hash(password);

         user = await User.findOneAndUpdate(
            { _id: req.user._id },
            {
               password: hashedPassword,
            },
            { new: true },
         );

         const accessToken = jwt.sign(
            { userId: user._id },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: process.env.JWT_EXPIRE },
         );

         sendToken(user, accessToken, res);
      } catch (e) {
         return next(new ErrorHander(e, 401));
      }
   };

   updateProfile = async (req, res, next) => {
      try {
         const updateUser = {
            name: req.body.name,
            email: req.body.email,
         };

         if (req.body.avatar !== '') {
            await cloundinary.v2.uploader.destroy(req.user.avatar.public_id);
            const myCloud = await cloundinary.v2.uploader.upload(
               req.body.avatar,
               {
                  folder: 'avatars',
                  width: 150,
                  crop: 'scale',
               },
            );

            updateUser.avatar = {
               public_id: myCloud.public_id,
               url: myCloud.secure_url,
            };
         }

         let user = await User.findOneAndUpdate(
            { _id: req.user._id },
            updateUser,
            {
               new: true,
            },
         );

         res.json({ success: true, user });
      } catch (e) {
         return next(new ErrorHander(e, 401));
      }
      /// ...
   };

   getAllUser = async (req, res, next) => {
      try {
         const users = await User.find().lean();

         res.json({ success: true, users });
      } catch (e) {
         return next(new ErrorHander(e, 401));
      }
   };

   getSingleUser = async (req, res, next) => {
      try {
         const user = await User.findById(req.params.id);

         if (!user) {
            return next(new ErrorHander('User not found', 404));
         }

         res.json({ success: true, user });
      } catch (e) {
         return next(new ErrorHander(e, 401));
      }
   };

   deleteUser = async (req, res, next) => {
      try {
         const user = await User.findById(req.params.id);

         if (!user) {
            return next(new ErrorHander('User not found', 404));
         }

         await user.remove();

         res.json({ success: true, message: 'Delete user complete' });
      } catch (e) {
         return next(new ErrorHander(e, 401));
      }
   };

   updateUserAdmin = async (req, res, next) => {
      try {
         let user = await User.findOneAndUpdate(req.params.id, req.body, {
            new: true,
         });

         res.json({ success: true, user });
      } catch (e) {
         return next(new ErrorHander(e, 401));
      }
      /// ...
   };
}

module.exports = new UserController();

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
         if (!req.body.avatar) {
            req.body.avatar =
               'data:image/png;base64,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';
         }
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
      const requestPasswordUrl = `http://localhost:3000/password/reset/${random}`;

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
            message: 'Update password success',
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
      const { newPassword, confirmPassword, oldPassword } = req.body;

      if (newPassword !== confirmPassword) {
         return next(new ErrorHander('Password not match', 403));
      }

      try {
         let user = await User.findById(req.user._id).select('+password');

         const passwordValid = await argon2.verify(user.password, oldPassword);

         if (!passwordValid) {
            return next(new ErrorHander('Old password is not match', 404));
         }

         const hashedPassword = await argon2.hash(newPassword);

         user = await User.findOneAndUpdate(
            { _id: req.user._id },
            {
               password: hashedPassword,
            },
            { new: true },
         );

         res.json({ success: true, user });
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
         console.log(user.avatar.public_id);
         await cloundinary.v2.uploader.destroy(user.avatar.public_id);

         if (!user) {
            return next(new ErrorHander('User not found', 404));
         }

         // await user.remove();

         res.json({ success: true, message: 'Delete user complete' });
      } catch (e) {
         return next(new ErrorHander(e, 401));
      }
   };

   updateUserAdmin = async (req, res, next) => {
      try {
         let user = await User.findByIdAndUpdate(req.params.id, req.body, {
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

const mongoose = require('mongoose')
const validator = require('validator')

const UserSchema = new mongoose.Schema({
   name: {
      type: String,
      required: [true, 'Please enter your name'],
      maxLength: [30, 'Name cannot exceed 30 characters'],
      minLength: [3, 'Name should have more 3 characters'],
   },
   email: {
      type: String,
      required: [true, 'Please enter your name'],
      unique: true,
      validate: [validator.isEmail, 'Please enter a valid email'],
   },
   password: {
      type: String,
      required: [true, 'Please enter your password'],
      minLength: [8, 'Name should have more 8 characters'],
      select: false,
   },
   avatar: {
      public_id: {
         type: String,
         required: true,
      },
      url: {
         type: String,
         required: true,
      },
   },
   role: {
      type: String,
      default: 'user',
   },

   resetPasswordToken: {
      type: String,
      default: null,
   },
})

module.exports = mongoose.model('users', UserSchema)

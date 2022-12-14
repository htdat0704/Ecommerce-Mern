const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
   name: {
      type: String,
      required: [true, 'Please Enter product Name'],
   },
   description: {
      type: String,
      required: [true, 'Please Enter product Description'],
   },
   price: {
      type: Number,
      required: [true, 'Please Enter product price'],
      maxLength: [8, 'Price can not exceed 8 characters'],
   },
   ratings: {
      type: Number,
      default: 0,
   },
   images: [
      {
         public_id: {
            type: String,
            required: true,
         },
         url: {
            type: String,
            required: true,
         },
      },
   ],
   category: {
      type: String,
      required: [true, 'Please Enter Product Category'],
   },
   stock: {
      type: Number,
      default: 1,
      maxLength: [4, 'Stock can not exceed 4 characters'],
   },
   numOfReviews: {
      type: Number,
      default: 0,
   },
   reviews: [
      {
         user: {
            type: mongoose.Schema.ObjectId,
            ref: 'users',
            required: true,
         },
         name: {
            type: String,
            required: true,
         },
         rating: {
            type: Number,
            required: true,
         },
         comment: {
            type: String,
            required: true,
         },
      },
   ],
   user: {
      type: mongoose.Schema.ObjectId,
      ref: 'users',
      required: true,
   },
   createdAt: {
      type: Date,
      default: Date.now,
   },
});

module.exports = mongoose.model('products', productSchema);

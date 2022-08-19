const Product = require('../model/Product');
const ErrorHander = require('../../utils/errorhander');
const ApiFeatures = require('../../utils/apiFeatures');
const cloundinary = require('cloudinary');

class ProductController {
   createProduct = async (req, res, next) => {
      let images = [];

      if (typeof req.body.images === 'String') {
         images.push(req.body, images);
      } else {
         images = req.body.images;
      }
      try {
         const imagesLinks = [];

         for (let i = 0; i < images.length; i++) {
            const result = await cloundinary.v2.uploader.upload(images[i], {
               folder: 'products',
            });

            imagesLinks.push({
               public_id: result.public_id,
               url: result.secure_url,
            });
         }

         req.body.images = imagesLinks;
         req.body.user = req.user._id;

         const product = await Product.create(req.body);

         res.json({ success: true, product });
      } catch (e) {
         return next(new ErrorHander(e, 401));
      }
   };

   getAllProduct = async (req, res, next) => {
      try {
         const resultPerPage = 8;
         const productCount = await Product.countDocuments();
         const apiFeaturesFilter = new ApiFeatures(Product.find(), req.query)
            .searchByName()
            .filter();

         let products = await apiFeaturesFilter.query;
         let filterCountProducts = products.length;

         const apiFeaturesFilterPaginagtion = new ApiFeatures(
            Product.find(),
            req.query,
         )
            .searchByName()
            .filter()
            .pagination(resultPerPage);

         products = await apiFeaturesFilterPaginagtion.query;

         res.json({
            success: true,
            products,
            productCount,
            filterCountProducts,
         });
      } catch (e) {
         return next(new ErrorHander(e, 400));
      }
   };

   getAllProductsAdmin = async (req, res, next) => {
      const products = await Product.find();

      res.status(200).json({
         success: true,
         products,
      });
   };

   updateProduct = async (req, res, next) => {
      let images = [];

      try {
         let product = await Product.findById(req.params.id);

         if (!product) {
            return next(new ErrorHander('Product not found', 404));
         }

         if (req.body.isUpdateImages) {
            if (typeof req.body.images === 'String') {
               images.push(req.body, images);
            } else {
               images = req.body.images;
            }

            for (let i = 0; i < product.images.length; i++) {
               await cloundinary.v2.uploader.destroy(
                  product.images[i].public_id,
               );
            }

            const imagesLinks = [];

            for (let i = 0; i < images.length; i++) {
               const result = await cloundinary.v2.uploader.upload(images[i], {
                  folder: 'products',
               });

               imagesLinks.push({
                  public_id: result.public_id,
                  url: result.secure_url,
               });

               req.body.images = imagesLinks;
            }
            product = await Product.findByIdAndUpdate(req.params.id, req.body, {
               new: true,
            });
         } else {
            product = await Product.findByIdAndUpdate(
               req.params.id,
               {
                  name: req.body.name,
                  price: req.body.price,
                  description: req.body.description,
                  category: req.body.category,
                  stock: req.body.stock,
               },
               {
                  new: true,
               },
            );
         }

         res.json({ success: true, product });
      } catch (e) {
         return next(new ErrorHander(e, 400));
      }
   };

   deleteProduct = async (req, res, next) => {
      try {
         let product = await Product.findById(req.params.id);

         if (!product) {
            return next(new ErrorHander('Product not found', 404));
         }

         for (let i = 0; i < product.images.length; i++) {
            await cloundinary.v2.uploader.destroy(product.images[i].public_id);
         }

         await product.remove();
         res.json({ success: true, message: '    success', product });
      } catch (e) {
         return next(new ErrorHander(e, 400));
      }
   };

   detailsProduct = async (req, res, next) => {
      try {
         let product = await Product.findById(req.params.id);
         if (!product) {
            return next(new ErrorHander('Product not found', 404));
         }
         res.json({ success: true, product });
      } catch (e) {
         return next(new ErrorHander(e, 400));
      }
   };

   createProductReview = async (req, res, next) => {
      const { rating, comment, productId } = req.body;
      const review = {
         user: req.user._id,
         name: req.user.name,
         rating: +rating,
         comment,
      };
      try {
         const product = await Product.findById(productId);

         const isReviewed = product.reviews.find(
            rev => rev.user.toString() === req.user._id.toString(),
         );

         if (isReviewed) {
            product.reviews.forEach(rev => {
               if (rev.user.toString() === req.user._id.toString()) {
                  rev.rating = rating;
                  rev.comment = comment;
               }
            });
         } else {
            product.reviews.push(review);
            product.numOfReviews = product.reviews.length;
         }

         let avg = 0;
         product.reviews.forEach(rev => {
            avg += rev.rating;
         });

         product.ratings = (avg / product.reviews.length).toFixed();
         await product.save({ validateBeforeSave: false });

         res.json({ success: true, review });
      } catch (e) {
         return next(new ErrorHander(e, 400));
      }
   };

   getProductReview = async (req, res, next) => {
      try {
         const keyword = req.params.keyword;
         const products = await Product.find({
            name: {
               $regex: keyword,
               $options: 'i',
            },
         }).lean();

         let AllReviews = [];
         products.map(product => {
            product.reviews &&
               product.reviews.map(rv => {
                  rv.product_name = product.name;
                  rv.product_id = product._id;
                  AllReviews.push(rv);
               });
         });
         // const { productId } = req.body;
         // const productFind = await Product.findById(productId);

         if (!products) {
            res.json({ success: true, reviews: [], AllReviews });
         }

         res.json({ success: true, reviews: AllReviews });
      } catch (e) {
         return next(new ErrorHander(e, 400));
      }
   };

   getAllReview = async (req, res, next) => {
      try {
         const products = await Product.find().lean();
         let AllReviews = [];
         products.map(product => {
            product.reviews &&
               product.reviews.map(rv => {
                  rv.product_name = product.name;
                  rv.product_id = product._id;
                  AllReviews.push(rv);
               });
         });

         res.json({ success: true, reviews: AllReviews });
      } catch (e) {
         return next(new ErrorHander(e, 400));
      }
   };

   deleteReview = async (req, res, next) => {
      try {
         const { productId, id } = req.body;

         const product = await Product.findById(productId).lean();

         if (!product) {
            return next(new ErrorHander('Product not Found', 400));
         }

         const reviews = product.reviews.filter(
            rev => rev._id.toString() !== id,
         );

         let avg = 0;

         reviews.forEach(rev => {
            avg += rev.rating;
         });

         const numOfReviews = reviews.length || 0;
         let ratings = 0;
         if (numOfReviews) {
            ratings = (avg / reviews.length).toFixed();
         }

         await Product.findByIdAndUpdate(
            productId,
            {
               reviews,
               ratings,
               numOfReviews,
            },
            { new: true },
         );

         res.json({
            success: true,
            message: 'Delete complete',
         });
      } catch (e) {
         return next(new ErrorHander(e, 400));
      }
   };
}

module.exports = new ProductController();

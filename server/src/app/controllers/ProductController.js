const Product = require('../model/Product');
const ErrorHander = require('../../utils/errorhander');
const ApiFeatures = require('../../utils/apiFeatures');

class ProductController {
   createProduct = async (req, res, next) => {
      req.body.user = req.user._id;

      try {
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

   updateProduct = async (req, res, next) => {
      try {
         let product = await Product.findById(req.params.id);

         if (!product) {
            return next(new ErrorHander('Product not found', 404));
         }

         product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
         });

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
         const { productId } = req.body;
         const productFind = await Product.findById(productId);

         if (!productFind) {
            return next(new ErrorHander('Product not Found', 400));
         }

         res.json({ success: true, reviews: productFind.reviews });
      } catch (e) {
         return next(new ErrorHander(e, 400));
      }
   };

   deleteReview = async (req, res, next) => {
      try {
         const { productId, id } = req.body;
         const product = await Product.findById(productId);

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

         const ratings = (avg / reviews.length).toFixed() || '0';
         const numOfReviews = reviews.length;

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

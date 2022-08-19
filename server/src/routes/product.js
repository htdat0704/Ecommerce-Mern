const express = require('express');
const router = express.Router();
const {
   isAuthenticatedUser,
   authorizeRole,
} = require('../app/middlewares/auth');

const ProductController = require('../app/controllers/ProductController');

router.post(
   '/create',
   isAuthenticatedUser,
   authorizeRole('admin'),
   ProductController.createProduct,
);
router.put(
   '/update/:id',
   isAuthenticatedUser,
   authorizeRole('admin'),
   ProductController.updateProduct,
);

router.delete(
   '/delete/review',
   isAuthenticatedUser,
   authorizeRole('admin'),
   ProductController.deleteReview,
);

router.delete(
   '/delete/:id',
   isAuthenticatedUser,
   authorizeRole('admin'),
   ProductController.deleteProduct,
);
router.get('/details/:id', ProductController.detailsProduct);

router.put(
   '/review',
   isAuthenticatedUser,
   ProductController.createProductReview,
);

// router.get('/reviews', ProductController.getProductReview);

router.get(
   '/admin/products',
   isAuthenticatedUser,
   authorizeRole('admin'),
   ProductController.getAllProductsAdmin,
);

router.get(
   '/admin/review/:keyword',
   isAuthenticatedUser,
   authorizeRole('admin'),
   ProductController.getProductReview,
);

router.get(
   '/admin/reviews',
   isAuthenticatedUser,
   authorizeRole('admin'),
   ProductController.getAllReview,
);

router.get('/', ProductController.getAllProduct);

module.exports = router;

const express = require('express');
const router = express.Router();
const {
   isAuthenticatedUser,
   authorizeRole,
} = require('../app/middlewares/auth');

const OrderController = require('../app/controllers/OrderController');

router.post('/new', isAuthenticatedUser, OrderController.newOrder);
router.get('/myOrders', isAuthenticatedUser, OrderController.myOrders);
router.get('/me/:id', isAuthenticatedUser, OrderController.getSingleOrder);

router.put(
   '/admin/updateStatus/:id',
   isAuthenticatedUser,
   authorizeRole('admin'),
   OrderController.updateStatusOrder,
);
router.delete(
   '/admin/delete/:id',
   isAuthenticatedUser,
   authorizeRole('admin'),
   OrderController.deleteOrders,
);
router.get(
   '/admin',
   isAuthenticatedUser,
   authorizeRole('admin'),
   OrderController.getAllOrder,
);

module.exports = router;

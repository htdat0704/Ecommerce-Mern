const Order = require('../model/Order');
const Product = require('../model/Product');
const ErrorHander = require('../../utils/errorhander');

class OrderController {
   newOrder = async (req, res, next) => {
      try {
         const {
            shippingInfo,
            orderItems,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
         } = req.body;

         const order = await Order.create({
            shippingInfo,
            orderItems,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            user: req.user._id,
            paidAt: Date.now(),
         });

         res.json({ success: true, order });
      } catch (e) {
         return next(new ErrorHander(e, 400));
      }
   };

   myOrders = async (req, res, next) => {
      try {
         const orders = await Order.find({ user: req.user._id });

         res.json({
            success: true,
            orders,
         });
      } catch (e) {
         return next(new ErrorHander(e, 400));
      }
   };

   getSingleOrder = async (req, res, next) => {
      try {
         const order = await Order.findById(req.params.id).populate(
            'user',
            'name email',
         );

         if (!order) {
            return next(new ErrorHander('Order not Found', 400));
         }

         res.json({
            success: true,
            order,
         });
      } catch (e) {
         return next(new ErrorHander(e, 400));
      }
   };

   getAllOrder = async (req, res, next) => {
      try {
         const orders = await Order.find({}).lean();

         let totalAmount = 0;

         orders.forEach(order => {
            totalAmount += order.totalPrice;
         });

         res.json({
            success: true,
            orders,
            totalAmount,
         });
      } catch (e) {
         return next(new ErrorHander(e, 400));
      }
   };

   updateStatusOrder = async (req, res, next) => {
      try {
         const order = await Order.findById(req.params.id);

         if (!order) {
            return next(new ErrorHander('Order not Found', 400));
         }

         if (order.orderStatus === 'Delivered') {
            return next(
               new ErrorHander('Your Order is Delivered already', 400),
            );
         }

         order.orderStatus = req.body.status;

         if (order.orderStatus === 'Delivered') {
            order.deliveredAt = Date.now();

            order.orderItems.forEach(async ord => {
               let product = await Product.findById(ord.product);
               product.stock -= ord.quantity;
               await product.save({ validateBeforeSave: false });
            });
         }

         await order.save({ validateBeforeSave: false });

         res.json({
            success: true,
         });
      } catch (e) {
         return next(new ErrorHander(e, 400));
      }
   };

   deleteOrders = async (req, res, next) => {
      try {
         const order = await Order.findById(req.params.id);
         if (!order) {
            return next(new ErrorHander('Order not Found', 400));
         }
         await order.remove();
         res.json({
            success: true,
            message: 'Delete complete',
         });
      } catch (e) {
         return next(new ErrorHander(e, 400));
      }
   };
}

module.exports = new OrderController();

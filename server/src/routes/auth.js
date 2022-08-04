const express = require('express');
const router = express.Router();
const {
   isAuthenticatedUser,
   authorizeRole,
} = require('../app/middlewares/auth');

const UserController = require('../app/controllers/UserController');

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/logout', UserController.logout);
router.post('/password/forget', UserController.forgetPassword);
router.put('/password/reset/:token', UserController.resetPassword);
router.put(
   '/password/update',
   isAuthenticatedUser,
   UserController.updatePassword,
);
router.get('/details', isAuthenticatedUser, UserController.getUserDetails);
router.put(
   '/details/update',
   isAuthenticatedUser,
   UserController.updateProfile,
);
router.get(
   '/admin/users',
   isAuthenticatedUser,
   authorizeRole('admin'),
   UserController.getAllUser,
);
router.get(
   '/admin/user/:id',
   isAuthenticatedUser,
   authorizeRole('admin'),
   UserController.getSingleUser,
);
router.delete(
   '/admin/delete/:id',
   isAuthenticatedUser,
   authorizeRole('admin'),
   UserController.deleteUser,
);
router.put(
   '/admin/update/:id',
   isAuthenticatedUser,
   authorizeRole('admin'),
   UserController.updateUserAdmin,
);
// router.get('/details/:id', UserController.detailsProduct);
// router.get('/', UserController.getAllProduct);

module.exports = router;

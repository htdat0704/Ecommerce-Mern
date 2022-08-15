import "./App.css";
import Header from "./component/layout/Header/header";
import WebFont from "webfontloader";
import { useEffect, useContext } from "react";
import Footer from "./component/layout/Footer/footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./component/Home/Home";
import ProductDetails from "./component/product/ProductDetails";
import Products from "./component/product/Products";
import Auth from "./component/Auth/Auth";
import { AuthContext } from "./context/auth/AuthContext";
import Profile from "./component/Auth/Profile";
import ProtectedRoute from "./component/Route/ProtectedRoute";
import UpdateProfile from "./component/Auth/UpdateProfile";
import UpdatePassword from "./component/Auth/UpdatePassword";
import ForgotPassword from "./component/Auth/ForgotPassword";
import ResetPassword from "./component/Auth/ResetPassword";
import Cart from "./component/Cart/Cart";
import Shipping from "./component/Cart/Shipping";
import ConfirmOrder from "./component/Cart/ConfirmOrder";
import OrderSuccess from "./component/Cart/OrderSuccess";
import MyOrders from "./component/Order/MyOrder";
import OrderDetails from "./component/Order/OrderDetails";
import DashBoard from "./component/Admin/DashBoard";

function App() {
  const {
    authState: { user, isAuthenticated },
    loadUser,
  } = useContext(AuthContext);

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    loadUser();
  }, []);

  return (
    <Router>
      <Header></Header>
      <Routes>
        <Route extact path="/product/:id" element={<ProductDetails />} />
        <Route extact path="/products" element={<Products />} />
        <Route extact path="/login" element={<Auth />} />
        <Route extact path="/profile" element={<Profile />} />
        <Route extact path="/cart" element={<Cart />} />
        <Route extact path="/password/forgot" element={<ForgotPassword />} />
        <Route
          extact
          path="/password/reset/:token"
          element={<ResetPassword />}
        />
        <Route
          path="/updateProfile"
          element={
            <ProtectedRoute user={isAuthenticated} role={user.role}>
              <UpdateProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/password/update"
          element={
            <ProtectedRoute user={isAuthenticated} role={user.role}>
              <UpdatePassword />
            </ProtectedRoute>
          }
        />
        <Route
          path="/password/update"
          element={
            <ProtectedRoute user={isAuthenticated} role={user.role}>
              <UpdatePassword />
            </ProtectedRoute>
          }
        />
        <Route
          extact
          path="/shipping"
          element={
            <ProtectedRoute user={isAuthenticated} role={user.role}>
              <Shipping />
            </ProtectedRoute>
          }
        />
        <Route
          extact
          path="/confirmOrder"
          element={
            <ProtectedRoute user={isAuthenticated} role={user.role}>
              <ConfirmOrder />
            </ProtectedRoute>
          }
        />
        <Route
          extact
          path="/orderSuccess"
          element={
            <ProtectedRoute user={isAuthenticated} role={user.role}>
              <OrderSuccess />
            </ProtectedRoute>
          }
        />
        <Route
          extact
          path="/orders"
          element={
            <ProtectedRoute user={isAuthenticated} role={user.role}>
              <MyOrders />
            </ProtectedRoute>
          }
        />
        <Route
          extact
          path="/order/:orderId"
          element={
            <ProtectedRoute user={isAuthenticated} role={user.role}>
              <OrderDetails />
            </ProtectedRoute>
          }
        />
        <Route extact path="/admin/dashboard" element={<DashBoard />} />
        <Route extact path="/" element={<Home />} />
      </Routes>
      <Footer></Footer>
    </Router>
  );
}

export default App;

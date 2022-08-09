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

function App() {
  const {
    authState: { isAuthenticated },
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
  console.log(isAuthenticated);
  return (
    <Router>
      <Header></Header>
      <Routes>
        <Route extact path="/product/:id" element={<ProductDetails />} />
        <Route extact path="/products" element={<Products />} />
        <Route extact path="/login" element={<Auth />} />
        <Route extact path="/profile" element={<Profile />} />
        <Route
          path="/updateProfile"
          element={
            <ProtectedRoute user={isAuthenticated}>
              <UpdateProfile />
            </ProtectedRoute>
          }
        />
        <Route extact path="/" element={<Home />} />
      </Routes>
      <Footer></Footer>
    </Router>
  );
}

export default App;

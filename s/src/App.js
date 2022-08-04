import "./App.css";
import Header from "./component/layout/Header/header";
import WebFont from "webfontloader";
import { useEffect } from "react";
import Footer from "./component/layout/Footer/footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./component/Home/Home";
import ProductDetails from "./component/product/ProductDetails";
import Products from "./component/product/Products";

function App() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
  }, []);

  return (
    <Router>
      <Header></Header>
      <Routes>
        <Route extact path="/" element={<Home />} />
        <Route extact path="/product/:id" element={<ProductDetails />} />
        <Route extact path="/products" element={<Products />} />
      </Routes>
      <Footer></Footer>
    </Router>
  );
}

export default App;

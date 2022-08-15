import React, { Fragment, useContext, useEffect, useState } from "react";
import mouse from "../../assets/mouse.svg";
import "./home.css";
import ProductCard from "./ProductCard";
import { ProductContext } from "../../context/product/ProductContext";
import LoadingModal from "../Loading/loading";

function Home() {
  const {
    productState: { products },
    getProducts,
  } = useContext(ProductContext);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(async () => {
      await getProducts();
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  console.log(products);

  return (
    <Fragment>
      {isLoading && <LoadingModal show={isLoading} />}
      <div className="banner">
        <p>Welcome to Ecommerce</p>
        <h1>FIND AMAZING PRODUCTS BELOW</h1>

        <a href="#container">
          <button>
            Scroll <img src={mouse} alt="mouse"></img>
          </button>
        </a>
      </div>
      <h2 className="homeHeading">Featured Products</h2>
      <div className="container" id="container">
        {products &&
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
      </div>
      <div className="container" id="container"></div>
    </Fragment>
  );
}

export default Home;

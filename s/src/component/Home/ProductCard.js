import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import "./home.css";

const ProductCard = ({ product }) => {
  const options = {
    value: Number(product.ratings),
    precision: 0.5,
    isHalf: true,
    edit: false,
    size: 18,
  };
  return (
    <Link className="productCard" to={`/product/${product._id}`}>
      <img src={product.images[0].url} alt={product.name} />
      <p>{product.name}</p>
      <div>
        <ReactStars {...options} />{" "}
        <span className="productCardSpan">
          {" "}
          ({product.numOfReviews} Reviews)
        </span>
      </div>
      <span>{`${product.price} VNĐ`}</span>
    </Link>
  );
};

export default ProductCard;

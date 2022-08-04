import React, { useEffect, useState, useContext } from "react";
import Carousel from "react-bootstrap/Carousel";
import { useParams } from "react-router-dom";
import LoadingModal from "../Loading/loading";
import { ProductContext } from "../../context/product/ProductContext";
import "./ProductDetails.css";
import ReactStars from "react-rating-stars-component";
import ReviewCard from "./ReviewCard";

const ProductDetails = () => {
  let { id } = useParams();
  const [isLoading, setLoading] = useState(true);

  const {
    productState: { product },
    getOneProduct,
  } = useContext(ProductContext);
  console.log(product);
  let body;

  useEffect(() => {
    const timer = setTimeout(async () => {
      await getOneProduct(id);
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [id]);

  if (isLoading) {
    body = <>{isLoading && <LoadingModal show={isLoading} />}</>;
  } else {
    const options = {
      size: 20,
      value: Number(product.ratings),
      edit: false,
      precision: 0.5,
    };
    body = (
      <>
        <div className="ProductDetails">
          <div>
            <Carousel variant="dark" controls={false}>
              {product.images.map((item) => (
                <Carousel.Item>
                  <img alt="img" src={item.url} className="CarouselImage" />
                </Carousel.Item>
              ))}
            </Carousel>
          </div>
          <div>
            <div className="detailsBlock-1">
              <h2>{product.name}</h2>
              <p>Product # {product._id}</p>
            </div>
            <div className="detailsBlock-2">
              <ReactStars {...options} />
              <span className="detailsBlock-2-span">
                {" "}
                ({product.numOfReviews} Reviews)
              </span>
            </div>
            <div className="detailsBlock-3">
              <h1>{`${product.price}`} VNĐ</h1>
              <div className="detailsBlock-3-1">
                <div className="detailsBlock-3-1-1">
                  <button>-</button>
                  <input readOnly type="number" />
                  <button>+</button>
                </div>
                <button disabled={product.Stock < 1 ? true : false}>
                  Add to Cart
                </button>
              </div>

              <p>
                Status : &nbsp;
                <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                  {product.Stock < 1 ? "OutOfStock" : "InStock"}
                </b>
              </p>
            </div>
            <div className="detailsBlock-4">
              Description : <p>{product.description}</p>
            </div>

            <button className="submitReview">Submit Review</button>
          </div>
        </div>
        <h3 className="reviewsHeading">REVIEWS</h3>
        {product.reviews && product.reviews[0] ? (
          <div className="reviews">
            {product.reviews &&
              product.reviews.map((review) => (
                <ReviewCard key={review._id} review={review} />
              ))}
          </div>
        ) : (
          <p className="noReviews">No Reviews Yet</p>
        )}
      </>
    );
  }

  return body;
};

export default ProductDetails;

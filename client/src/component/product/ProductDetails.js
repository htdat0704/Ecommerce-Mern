import React, { useEffect, useState, useContext } from "react";
import Carousel from "react-bootstrap/Carousel";
import { useParams, useNavigate } from "react-router-dom";
import LoadingModal from "../Loading/loading";
import { ProductContext } from "../../context/product/ProductContext";
import "./ProductDetails.css";
import ReactStars from "react-rating-stars-component";
import ReviewCard from "./ReviewCard";
import { CartContext } from "../../context/cart/CartContext";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { AuthContext } from "../../context/auth/AuthContext";

const ProductDetails = () => {
  const navigate = useNavigate();
  const { addItemsToCart } = useContext(CartContext);
  let { id } = useParams();
  const [isLoading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const {
    productState: { product },
    getOneProduct,
    createNewReviews,
  } = useContext(ProductContext);

  const {
    authState: { isAuthenticated },
  } = useContext(AuthContext);

  let body;

  const loadingShow = () => {
    setLoadingSubmit(true);
    setTimeout(() => {
      setLoadingSubmit(false);
    }, 2000);
  };

  const increaseQuantity = () => {
    if (product.Stock <= quantity) return;

    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    if (1 >= quantity) return;

    const qty = quantity - 1;
    setQuantity(qty);
  };

  const addToCartHandler = () => {
    loadingShow();
    addItemsToCart(id, quantity);
  };

  const reviewSubmitHandler = () => {
    const myForm = {
      comment,
      rating,
      productId: product._id,
    };

    createNewReviews(myForm);
    setOpen(false);
  };

  const submitReviewToggle = () => {
    if (!isAuthenticated) {
      navigate("/login", { replace: true });
    }
    open ? setOpen(false) : setOpen(true);
  };

  useEffect(() => {
    const timer = setTimeout(async () => {
      await getOneProduct(id);
      setLoading(false);
    }, 1500);
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
                  <button onClick={decreaseQuantity}>-</button>
                  <span>{quantity}</span>
                  <button onClick={increaseQuantity}>+</button>
                </div>
                <button
                  disabled={product.Stock < 1 ? true : false}
                  onClick={addToCartHandler}
                >
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
            {isAuthenticated ? (
              <button className="submitReview" onClick={submitReviewToggle}>
                Submit Review
              </button>
            ) : (
              <button className="submitReview" onClick={submitReviewToggle}>
                Login
              </button>
            )}
          </div>
        </div>
        <h3 className="reviewsHeading">REVIEWS</h3>
        <Modal
          aria-labelledby="simple-dialog-title"
          show={open}
          onClose={submitReviewToggle}
        >
          {" "}
          <Modal.Title>Submit Review</Modal.Title>
          <Modal.Body>
            <ReactStars
              onChange={(e) => setRating(e)}
              value={rating}
              precision={0.5}
              isHalf={true}
              size={20}
            />
            <textarea
              className="submitDialogTextArea"
              cols="30"
              rows="5"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={submitReviewToggle} variant="secondary">
              Cancel
            </Button>
            <Button onClick={reviewSubmitHandler} variant="primary">
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
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

  return (
    <>
      {body}
      <LoadingModal show={loadingSubmit} />
    </>
  );
};

export default ProductDetails;

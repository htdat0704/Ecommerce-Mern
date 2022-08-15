import React, { Fragment, useContext } from "react";
import "./Cart.css";
import CartItemCard from "./CartItemCard";
import RemoveShoppingCartIcon from "../../assets/cart-x-fill.svg";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../../context/cart/CartContext";
import { AuthContext } from "../../context/auth/AuthContext";

const Cart = () => {
  const navigate = useNavigate();
  const {
    cartState: { cartItems },
    removeItem,
    addItemsToCart,
  } = useContext(CartContext);

  const {
    authState: { isAuthenticated },
  } = useContext(AuthContext);

  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      return;
    }
    addItemsToCart(id, newQty);
  };

  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) {
      return;
    }
    addItemsToCart(id, newQty);
  };

  const deleteCartItems = (id) => {
    console.log(id);
    removeItem(id);
  };

  console.log(isAuthenticated);
  const checkoutHandler = () => {
    if (isAuthenticated) {
      navigate("/shipping", { replace: true });
    } else {
      navigate("/login", { replace: true });
    }
  };

  return (
    <Fragment>
      {cartItems.length === 0 ? (
        <div className="emptyCart">
          <img src={RemoveShoppingCartIcon} alt="icon" className="svgImg" />

          <h2>No Product in Your Cart</h2>
          <Link to="/products">View Products</Link>
        </div>
      ) : (
        <Fragment>
          <div className="cartPage">
            <div className="cartHeader">
              <p>Product</p>
              <p>Quantity</p>
              <p>Subtotal</p>
            </div>
            {cartItems &&
              cartItems.map((item) => (
                <div className="cartContainer" key={item.product}>
                  <CartItemCard item={item} deleteCartItems={deleteCartItems} />
                  <div className="cartInput">
                    <button
                      onClick={() =>
                        decreaseQuantity(item.product, item.quantity)
                      }
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() =>
                        increaseQuantity(
                          item.product,
                          item.quantity,
                          item.stock
                        )
                      }
                    >
                      +
                    </button>
                  </div>
                  <p className="cartSubtotal">
                    {`${item.price * item.quantity}`} VND
                  </p>
                </div>
              ))}

            <div className="cartGrossProfit">
              <div></div>
              <div className="cartGrossProfitBox">
                <p>Gross Total</p>
                <p>
                  {`${cartItems.reduce(
                    (acc, item) => acc + item.quantity * item.price,
                    0
                  )}`}
                  VND
                </p>
              </div>
              <div></div>
              {isAuthenticated ? (
                <div className="checkOutBtn">
                  <button onClick={checkoutHandler}>Check Out</button>
                </div>
              ) : (
                <div className="checkOutBtn">
                  <button onClick={checkoutHandler}>Login to Buy</button>
                </div>
              )}
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Cart;

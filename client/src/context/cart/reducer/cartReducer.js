import {
  ADD_TO_CART,
  REMOVE_ITEM_CART,
  SAVE_SHIPPING_INFOR,
  REMOVE_ALL_ITEMS,
} from "./cartAction";

export const cartInit = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  shippingInfor: localStorage.getItem("shippingInfor")
    ? { ...JSON.parse(localStorage.getItem("shippingInfor")) }
    : {
        address: "",
        city: "",
        country: "",
        phoneNo: "",
      },
};

export const cartReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case REMOVE_ALL_ITEMS:
      return {
        ...state,
        cartItems: [],
      };
    case SAVE_SHIPPING_INFOR:
      localStorage.setItem("shippingInfor", JSON.stringify(payload));
      return {
        ...state,
        shippingInfor: { ...payload },
      };
    case REMOVE_ITEM_CART:
      const cartItemsNew = state.cartItems.filter((i) => i.product !== payload);

      localStorage.setItem("cartItems", JSON.stringify(cartItemsNew));
      return {
        ...state,

        cartItems: cartItemsNew,
      };

    case ADD_TO_CART:
      const item = payload;

      const isItemExist = state.cartItems.find(
        (ite) => ite.product === item.product
      );
      let newCart;
      if (isItemExist) {
        newCart = {
          ...state,

          cartItems: state.cartItems.map((i) =>
            i.product === isItemExist.product ? item : i
          ),
        };
      } else {
        newCart = {
          ...state,

          cartItems: [...state.cartItems, item],
        };
      }
      localStorage.setItem("cartItems", JSON.stringify(newCart.cartItems));
      return newCart;
    default:
      return { ...state };
  }
};

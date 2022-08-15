export const ADD_TO_CART = "add_to_cart";

export const REMOVE_ITEM_CART = "remove_item_cart";

export const SAVE_SHIPPING_INFOR = "save_shipping_infor";

export const REMOVE_ALL_ITEMS = "remove_all_items";

export const removeAllItemsCart = () => {
  return {
    type: REMOVE_ALL_ITEMS,
  };
};

export const saveShippingInfomation = (payload) => {
  return {
    type: SAVE_SHIPPING_INFOR,
    payload,
  };
};

export const removeItemCart = (payload) => {
  return {
    type: REMOVE_ITEM_CART,
    payload,
  };
};

export const addToCart = (payload) => {
  return {
    type: ADD_TO_CART,
    payload,
  };
};

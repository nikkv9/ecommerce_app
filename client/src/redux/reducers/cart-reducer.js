export const cartReducer = (
  state = { cartItems: [], shippingInfo: {} },
  action
) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const item = action.payload;

      const alreadyItemExist = state.cartItems.find((p) => p.pId === item.pId);

      if (alreadyItemExist) {
        return {
          ...state,
          cartItems: state.cartItems.map((p) =>
            p.pId === alreadyItemExist.pId ? item : p
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cartItems: state.cartItems.filter((p) => p.pId !== action.payload),
      };

    case "SAVE_SHIPPING_INFO":
      return {
        ...state,
        shippingInfo: action.payload,
      };

    default:
      return state;
  }
};

export const initialState = {
  basket: [],
  user: null,
  tourInfo: [],
  hotelsInfo: [],
};

//Selector
export const getBasketTotal = (basket) =>
  basket?.reduce((amount, item) => item.price + amount, 0);

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_BASKET":
      return {
        ...state,
        basket: [...state.basket, action.item],
      };
    case "EMPTY_BASKET":
      return {
        ...state,
        basket: [],
      };
    case "REMOVE_FROM_BASKET":
      const index = state.basket.findIndex(
        (basketItem) => basketItem.state === action.state
      );
      let newBasket = [...state.basket];

      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(
          `Cant remove product (id: ${action.state}) as its not in basket! `
        );
      }

      return {
        ...state,
        basket: newBasket,
      };

    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };

    case "SET_TOURINFO":
      return {
        ...state,
        tourInfo: [...state.tourInfo, action.tourInfo],
      };

    case "SET_HOTELS":
      return {
        ...state,
        hotelsInfo: [...state.hotelsInfo, action.hotelsInfo],
      };

    default:
      return state;
  }
};

export default reducer;

import { createSlice } from "@reduxjs/toolkit";

const fakeCart = [
  {
    id: 1,
    name: "beef",
    unitPrice: 20,
    quantity: 3,
  },
  {
    id: 2,
    name: "banana",
    unitPrice: 2.1,
    quantity: 2,
  },
  {
    id: 3,
    name: "milk",
    unitPrice: 3.5,
    quantity: 5,
  },
];

const initialState = {
  cart: fakeCart,
  amount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    increaseItem: (state, action) => {
      const itemObj = state.cart.find((item) => item.id === action.payload.id);
      if (itemObj) itemObj.quantity += 1;
      else state.cart.push(action.payload);
    },
    decreaseItem: (state, action) => {
      const itemObj = state.cart.find((item) => item.id === action.payload.id);
      if (itemObj) {
        if (itemObj.quantity === 1)
          state.cart = state.cart.filter(
            (item) => item.id !== action.payload.id
          );
        else itemObj.quantity -= 1;
      }
    },
  },
});

export const { increaseItem, decreaseItem } = cartSlice.actions;
export default cartSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: {},
  accumulation: {},
};

function combineObjects(obj1, obj2) {
  // Convert keys to lowercase and accumulate values
  const lowerCaseObj1 = Object.keys(obj1).reduce((acc, key) => {
    acc[key.toLowerCase()] = obj1[key];
    return acc;
  }, {});

  const lowerCaseObj2 = Object.keys(obj2).reduce((acc, key) => {
    acc[key.toLowerCase()] = obj2[key];
    return acc;
  }, {});

  // Combine the objects, summing values for matching keys
  return Object.keys({ ...lowerCaseObj1, ...lowerCaseObj2 }).reduce(
    (acc, key) => {
      acc[key] = (lowerCaseObj1[key] || 0) + (lowerCaseObj2[key] || 0);
      return acc;
    },
    {}
  );
}

const deliverySlice = createSlice({
  name: "delivery",
  initialState,
  reducers: {
    pickUpOrDrop: (state, action) => {
      state.products = combineObjects(state.products, action.payload);
    },
    accumulate: (state, action) => {
      state.accumulation = combineObjects(state.accumulation, action.payload);
    },
  },
});

export const { pickUpOrDrop, accumulate } = deliverySlice.actions;
export default deliverySlice.reducer;

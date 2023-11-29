import { configureStore } from "@reduxjs/toolkit";
import deliverySlice from "./features/delivery/deliverySlice";

const store = configureStore({
  reducer: {
    delivery: deliverySlice,
  },
});

export default store;

import { configureStore } from "@reduxjs/toolkit";
import stocksReducer from "./stockSlice";

const store = configureStore({
  reducer: {
    stocks: stocksReducer,
  },
});

export default store;

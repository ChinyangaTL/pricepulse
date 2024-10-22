import { configureStore } from "@reduxjs/toolkit";
import stocksReducer from "./stockSlice";

export type RootState = ReturnType<typeof store.getState>;

const store = configureStore({
  reducer: {
    stocks: stocksReducer,
  },
});

export default store;

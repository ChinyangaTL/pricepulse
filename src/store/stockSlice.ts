import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Stock {
  symbol: string;
  currentPrice: number;
  change: number;
  percentChange: number;
  highPrice: number;
  lowPrice: number;
  openPrice: number;
  previousClosePrice: number;
}

interface StocksState {
  stocks: Stock[];
  loading: boolean;
  error: string | null;
}

const initialState: StocksState = {
  stocks: [],
  loading: false,
  error: null,
};

const stocksSlice = createSlice({
  name: "stocks",
  initialState,
  reducers: {
    setStocks(state, action: PayloadAction<Stock[]>) {
      state.stocks = action.payload;
      state.loading = false;
    },
    setLoading(state) {
      state.loading = true;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setStocks, setLoading, setError } = stocksSlice.actions;
export default stocksSlice.reducer;

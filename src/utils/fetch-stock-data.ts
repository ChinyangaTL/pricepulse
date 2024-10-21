import axios from "axios";
import { popularStockSymbols } from "./popular-stocks";
import { mockStockData } from "./mock";

export const fetchStockData = async () => {
  try {
    const promises = popularStockSymbols.map((symbol) =>
      axios.get(
        `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${process.env.REACT_APP_FINNHUB}`
      )
    );

    const responses = await Promise.all(promises);

    const stocks = responses.map((response, index) => ({
      symbol: popularStockSymbols[index],
      currentPrice: response.data.c,
      change: response.data.d,
      percentChange: response.data.dp,
      highPrice: response.data.h,
      lowPrice: response.data.l,
      openPrice: response.data.o,
      previousClosePrice: response.data.pc,
    }));

    return stocks;
  } catch (error) {
    console.error("Error fetching stock data:", error);
  }
};

export const fetchStockDataMock = async () => {
  return mockStockData;
};

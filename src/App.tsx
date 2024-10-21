import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setStocks, setError } from "./store/stockSlice";
import { popularStockSymbols } from "./utils/popular-stocks";
import StockList from "./components/stock-list";
import Filter from "./components/filter";
import Sorter from "./components/sorter";

const fetchStockData = async () => {
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

const App: React.FC = () => {
  const dispatch = useDispatch();
  const [filterThreshold, setFilterThreshold] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>("currentPrice");

  const {
    data: stockData,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["stocks"],
    queryFn: fetchStockData,

    // refetchInterval: 5000,
  });

  useEffect(() => {
    if (stockData) {
      console.log(stockData);
      dispatch(setStocks(stockData));
    } else dispatch(setError("Error fetching stock data!"));
  }, [stockData]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching stock data!</div>;

  const filteredStocks =
    stockData?.filter((stock) => stock.percentChange >= filterThreshold) || [];

  const sortedStocks = filteredStocks.sort((a, b) => {
    if (sortBy === "currentPrice") {
      return a.currentPrice - b.currentPrice;
    } else if (sortBy === "percentChange") {
      return a.percentChange - b.percentChange;
    }
    return 0;
  });

  return (
    <div>
      <h1>Price Pulse</h1>
      <Filter onFilterChange={setFilterThreshold} />
      <Sorter onSortChange={setSortBy} />
      <StockList stocks={sortedStocks} />
    </div>
  );
};

export default App;

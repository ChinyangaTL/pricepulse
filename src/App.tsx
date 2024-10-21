import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setStocks, setError } from "./store/stockSlice";
import { popularStockSymbols } from "./utils/popular-stocks";
import StockList from "./components/stock-list";
import Filter from "./components/filter";
import Sorter from "./components/sorter";
import "./styles/app.scss";
import { fetchStockData } from "./utils/fetch-stock-data";

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

  useEffect(() => {
    const savedFilter = localStorage.getItem("filterThreshold");
    const savedSort = localStorage.getItem("sortBy");

    if (savedFilter) {
      setFilterThreshold(Number(savedFilter));
    }
    if (savedSort) {
      setSortBy(savedSort);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("filterThreshold", filterThreshold.toString());
    localStorage.setItem("sortBy", sortBy);
  }, [filterThreshold, sortBy]);

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
    <div className="container">
      <h1>Price Pulse</h1>

      <Filter onFilterChange={setFilterThreshold} />
      <Sorter onSortChange={setSortBy} />

      {isLoading && (
        <div className="loading-container">
          Loading...
          <div className="loading-spinner"></div>
        </div>
      )}

      {error && (
        <div className="error-container">
          Error fetching stock data: {error.message}
        </div>
      )}
      <StockList stocks={sortedStocks} />
    </div>
  );
};

export default App;

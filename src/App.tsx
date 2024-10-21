import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setStocks, setError } from "./store/stockSlice";

const fetchStockData = async () => {
  try {
    const response = await axios.get(
      `https://finnhub.io/api/v1/quote?symbol=AAPL&token=${process.env.REACT_APP_FINNHUB_API_KEY}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching stock data:", error);
  }
};

const App: React.FC = () => {
  const dispatch = useDispatch();

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
    if (stockData) dispatch(setStocks(stockData));
    else dispatch(setError("Error fetching stock data!"));
  }, [stockData]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching stock data!</div>;

  return (
    <div>
      <h1>Price Pulse</h1>
    </div>
  );
};

export default App;

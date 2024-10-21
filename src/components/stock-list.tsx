import React from "react";
import { Stock } from "../store/stockSlice";

interface StockListProps {
  stocks: Stock[];
}

const StockList: React.FC<StockListProps> = ({ stocks }) => {
  return (
    <ul>
      {stocks.map((stock) => (
        <li key={stock.symbol}>
          <span>{stock.symbol}</span>
          <div>
            <strong>Current Price:</strong> ${stock.currentPrice.toFixed(2)}{" "}
            <br />
            <strong>Change:</strong> {stock.change.toFixed(2)} <br />
            <strong>Percent Change:</strong> {stock.percentChange.toFixed(2)}%{" "}
            <br />
            <strong>High Price:</strong> ${stock.highPrice.toFixed(2)} <br />
            <strong>Low Price:</strong> ${stock.lowPrice.toFixed(2)} <br />
            <strong>Open Price:</strong> ${stock.openPrice.toFixed(2)} <br />
            <strong>Previous Close Price:</strong> $
            {stock.previousClosePrice.toFixed(2)} <br />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default StockList;

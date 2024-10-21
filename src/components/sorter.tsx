import React from "react";
import "../styles/sorter.scss";

interface SorterProps {
  onSortChange: (sortBy: string) => void;
}

const Sorter: React.FC<SorterProps> = ({ onSortChange }) => {
  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value);
  };

  return (
    <div className="sorting-container">
      <label>Sort by:</label>
      <select onChange={handleSortChange}>
        <option value="currentPrice">Current Price</option>
        <option value="percentChange">Percent Change</option>
      </select>
    </div>
  );
};

export default Sorter;

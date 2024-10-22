import React, { useEffect, useState } from "react";
import "../styles/sorter.scss";

interface SorterProps {
  onSortChange: (sortBy: string) => void;
}

const Sorter: React.FC<SorterProps> = ({ onSortChange }) => {
  const [sortBy, setSortBy] = useState<string>("currentPrice");
  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value);
  };

  useEffect(() => {
    const savedSort = localStorage.getItem("sortBy");
    if (savedSort) {
      setSortBy(savedSort);
      onSortChange(savedSort);
    }
  }, [onSortChange]);

  return (
    <div className="sorting-container">
      <label>Sort by:</label>
      <select value={sortBy} onChange={handleSortChange}>
        <option value="currentPrice">Current Price</option>
        <option value="percentChange">Percent Change</option>
      </select>
    </div>
  );
};

export default Sorter;

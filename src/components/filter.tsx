import React, { useState, useEffect } from "react";
import "../styles/filter.scss";

interface FilterProps {
  onFilterChange: (threshold: number) => void;
}

const Filter: React.FC<FilterProps> = ({ onFilterChange }) => {
  const [threshold, setThreshold] = useState<number>(0);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    setThreshold(value);
    onFilterChange(value);
  };

  useEffect(() => {
    const savedThreshold = localStorage.getItem("filterThreshold");
    if (savedThreshold) {
      setThreshold(Number(savedThreshold));
    }
  }, []);

  return (
    <div className="filter-container">
      <label>Filter by Minimum Percentage Change:</label>
      <input
        type="number"
        value={threshold}
        onChange={handleChange}
        placeholder="Enter percentage change"
      />
    </div>
  );
};

export default Filter;

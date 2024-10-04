import { useState } from 'react';
// import './style.css';

const FilterDropdown = ({ onFilterChange }) => {
  const [selectedFilter, setSelectedFilter] = useState('Default');

  const handleFilterChange = (e) => {
    setSelectedFilter(e.target.value);
    onFilterChange(e.target.value);
  };

  return (
    <div className="filter-container row">
      <div className='filter-description col-md-6 col-sm-6'>

        <span>₹5,000 - ₹10,000 Worth Items</span>
      </div>
      <div className="filter-header col-md-6 col-sm-6">
        <select className="filter-select" value={selectedFilter} onChange={handleFilterChange}>
          <option value="Default">Filter by</option>
          <option value="lowToHigh">Price: Low to High</option>
          <option value="highToLow">Price: High to Low</option>
        </select>
      </div>
    </div>
  );
};

export default FilterDropdown;

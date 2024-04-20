import React from "react";

const Filter = ({ searchTerm, handleSearchChange }) => {
  return (
    <div>
      Filter : <input value={searchTerm} onChange={handleSearchChange} />
    </div>
  );
};

export default Filter;

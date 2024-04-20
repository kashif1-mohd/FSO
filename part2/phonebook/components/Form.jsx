import React from "react";

const Form = ({
  addName,
  newName,
  handleInputChange,
  newNumber,
  handleNumberChange,
}) => {
  return (
    <form onSubmit={addName}>
      <div>
        name: <input value={newName} onChange={handleInputChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <button type="submit">Add</button>
    </form>
  );
};

export default Form;

import { useState } from "react";
import Persons from "../components/Persons";
import Filter from "../components/Filter";
import Form from "../components/Form";
import axios from "axios";
import { useEffect } from "react";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const hook = () => {
    console.log("effect");
    axios.get("http://localhost:3001/persons").then((response) => {
      console.log("Promise fulfilled");
      setPersons(response.data);
    });
  };

  useEffect(hook, []);

  const addName = (event) => {
    event.preventDefault();
    const nameExists = persons.some(
      (data) => data.name.toLowerCase() === newName.toLowerCase()
    );

    if (nameExists) {
      alert(`${newName} is already added to the phonebook`);
    } else {
      const addName = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      };
      axios.post("http://localhost:3001/persons", addName).then((response) => {
        setPersons(persons.concat(addName));
        setNewName("");
        setNewNumber("");
      });
    }
  };

  const handleDeletePerson = (id) => {
    console.log(`deleting the person with id ${id}`);
    const url = `http://localhost:3001/persons/${id}`;
    axios
      .delete(url)
      .then(() => {
        const updatedPersons = persons.filter((person) => person.id !== id);
        setPersons(updatedPersons);
      })
      .catch((error) => {
        console.log("Error deleting person:", error);
      });
  };

  const handleInputChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredPersons = persons.filter((data) =>
    data.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        <Filter
          searchTerm={searchTerm}
          handleSearchChange={handleSearchChange}
        />
      </div>
      <Form
        addName={addName}
        newName={newName}
        handleInputChange={handleInputChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons
        persons={filteredPersons}
        handleDeletePerson={handleDeletePerson}
      />
    </div>
  );
};

export default App;

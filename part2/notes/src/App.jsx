import { useState, useEffect } from "react";
import "./index.css";
import Note from "../components/Note";
import noteService from "../services/noteService";
import Notification from "../components/Notification";
import axios from "axios";

const Footer = () => {
  const footerStyle = {
    color: "green",
    fontStyle: "italic",
    fontSize: 16,
  };
  return (
    <div style={footerStyle}>
      <br />
      <em>Note app, By Kashif Uddin Mohammed</em>
    </div>
  );
};

const App = (props) => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("a new note...");
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState("some error happened...");

  const hook = () => {
    console.log("effect");
    noteService.getAll().then((initialNotes) => {
      setNotes(initialNotes);
    });
  };
  useEffect(hook, []);
  console.log("render", notes.length, "notes");

  const addNote = (event) => {
    event.preventDefault();
    console.log("button clicked", event.target);

    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    };
    noteService.create().then((returnedNote) => {
      setNotes(notes.concat(returnedNote));
      setNewNote("");
    });
  };

  const handleInputChange = (event) => {
    console.log(event.target.value);
    setNewNote(event.target.value);
  };

  const toggleImportanceOf = (id) => {
    const url = `http://localhost:3001/notes/${id}`;
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };

    noteService
      .update(id, changedNote)
      .then((returnedNote) => {
        setNotes(notes.map((n) => (n.id !== id ? n : returnedNote)));
      })
      .catch((error) => {
        // alert(`the note '${note.content} was already deleted from server`);
        setErrorMessage(
          `Note '${note.content}' was already removed from the server.`
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        setNotes(notes.filter((n) => n.id !== id));
      });
  };

  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important === true);

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          Show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleInputChange} />
        <button type="submit">Save</button>
      </form>
      <Footer />
    </div>
  );
};

export default App;

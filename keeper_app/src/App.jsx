import { useState } from 'react';
import './App.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import CreateNote from './Components/CreateNote';
import Note from './Components/Note';
import BasicModal from './Components/BasicModal';

function App() {
  const [notes, setNotes] = useState([]);
  const addNote = (newNote) => {
    setNotes([...notes, newNote]);
  };

  return (
    <>
     <Header/>
     <CreateNote  onAddNote={addNote}/>
     <Note notes={notes} />
     <Footer/>
    </>
  )
};

export default App;

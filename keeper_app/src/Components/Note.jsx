import React, { useState, useEffect } from 'react';
import BasicModal from './BasicModal';

const Note = ({ notes }) => {
  const [notes_data, setNotesData] = useState([]);
  const [currentNote, setCurrentNote] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteFlag, setDeleteFlag] = useState(false);

  const handleOpen = (noteToDelete) => {
    setModalOpen(true);
    setCurrentNote(noteToDelete);
  };

  const fetchNotes = async () => {
    try {
      const res = await fetch("/api/notes/get_notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({"userId": "664cafb64d06774fd1909ada"})
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();
      setNotesData(data);
    } catch (error) {
      console.error("Failed to fetch notes:", error);
    }
  };

  useEffect(() => {
    if (deleteFlag) {
      fetchNotes();
      setDeleteFlag(false);
    }
  }, [deleteFlag]);

  useEffect(() => {
    fetchNotes();
  }, []);

  console.log("\n--------------------------------", notes_data);

  return (
    <>
      <div className='container'>
        <div>
          {notes.map((note, index) => (
            <div key={index} className='note'>
              <h3 id='note-title'>{note.title}</h3>
              <p>{note.content}</p>
              <button onClick={() => handleOpen(note)}>View</button>
            </div>
          ))}
        </div>

        <div>
          {notes_data.map((note, index) => (
            <div key={index} className='note'>
              <h3 id='note-title'>{note.title}</h3>
              <p>{note.content}</p>
              <button onClick={() => handleOpen(note)}>View</button>
            </div>
          ))}
        </div>
      </div>

      <BasicModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        currentNote={currentNote}
        setDeleteFlag={setDeleteFlag}
      />
    </>
  );
};

export default Note;

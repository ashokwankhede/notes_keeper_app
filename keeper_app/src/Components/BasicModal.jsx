import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';


const BasicModal = ({modalOpen,setModalOpen,currentNote,setDeleteFlag}) => {
  const [open, setOpen] = React.useState(modalOpen);
 
  const handleClose = () => {
    setOpen(false);
    setModalOpen(false);
  }

  const deleteNote = (currentNote) => {
    fetch("/api/notes/delete-Note", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(currentNote),
    })
     .then((res) => res.json())
     .then((data) => {
        setModalOpen(false);
      })
     .catch((err) => console.log(err));
    setOpen(false);
    setDeleteFlag(true);
    setModalOpen(false);
  };
  
  return (
<div>
      <Modal
        open={modalOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className = "modal-box">
        <button onClick={()=>handleClose()}> X</button> 
          <Typography className="modal-modal-title" variant="h6" component="h2">
            {currentNote.title}
          </Typography>
          <Typography className="modal-modal-description" sx={{ mt: 2 }}>
            {currentNote.content}
          </Typography>
          <button onClick={()=>deleteNote(currentNote)}>Delete</button>
        </Box>
      </Modal>
    </div>
  )
};
export default BasicModal;
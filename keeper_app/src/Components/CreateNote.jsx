import React from 'react';
import { useState } from 'react';



const CreateNote = ({ onAddNote }) => {
    const [notes, setNote] = useState({});

    const handelChange = (event) =>{
        setNote({
          ...notes,
          ["userId"]:"664cafb64d06774fd1909ada",
          [event.target.id]:event.target.value,
        });
        
    };

    
  const submitEvent = (e) =>{
    if(e.key==='Enter'){
      handelSubmit(e)
    }
  };

    const handelSubmit = async (event) => {
      event.preventDefault();
      onAddNote(notes);
      console.log("form submit")
       const res = fetch('/api/notes/',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        
        body:JSON.stringify(notes)
       })

       const data = await res.json();
       if (data.status ===false){
         toast.error("Note cannot be created!");
       }else if (data.status===true){
         toast.success("Note created successfully!");
     }
     setNote({});
    };
    

    
  return (
    <>
        <form onSubmit={handelSubmit}>
            <input type="text" placeholder="Title" id='title' onChange={handelChange} onKeyDown={submitEvent}/>
            <textarea placeholder="Take a note..." id='content' onChange={handelChange} onKeyDown={submitEvent}></textarea>
            <button type="submit">Add</button>
        </form>
    </>
  )
}

export default CreateNote
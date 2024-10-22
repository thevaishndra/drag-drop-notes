import React from 'react'
import Trash from '../icons/Trash'
import { db } from '../appwrite/databases';
import { useContext } from 'react';
import { NoteContext } from '../context/NoteContext';

const DeleteButton = ({noteId}) => {
  const {setNotes} = useContext(NoteContext);
    const handleDelete = async () => {
        db.notes.delete(noteId);//deleting from database(permanent)
        setNotes((prevState) =>
          prevState.filter((note) => note.$id !== noteId)//updates the state of notes so that ui reflects it
        );//using prev state as we want to work with up to date latest data
    };
  return (
    <div onClick={handleDelete} ><Trash /></div>
  )
}

export default DeleteButton
import React from 'react'
import {useContext} from 'react';
import {NoteContext} from '../context/NoteContext';
import {db} from '../appwrite/databases'

const Color = ({color}) => {
  const {selectedNote, notes, setNotes} = useContext(NoteContext)

    const changeColor = () => {
        try {
          const currentNoteIndex = notes.findIndex(//finds selected notes index in notes array
            (note) => note.$id === selectedNote.$id
          )

          //creates new updated note
          const updatedNote = {
            ...notes[currentNoteIndex],//properties of notes
            colors: JSON.stringify(color),//color field with new color
          };

          //updates note state
          const newNotes = [...notes];//makes copy of notes
          newNotes[currentNoteIndex] = updatedNote//replaces selected note with updated note
          setNotes(newNotes);//updates ui

          db.notes.update(selectedNote.$id, {colors:JSON.stringify(color)})//updates appwrite db

        } catch (error) {
          alert("You must select a note before changing colors");
        }
    }
  return (
    <div
      className="color bg-gray-500 h-10 w-10 rounded-full 
      cursor-pointer transition-all duration-300 hover:h-[45px] hover:w-[45px]"
      onClick={changeColor}
      style={{ backgroundColor: color.colorHeader }}
    ></div>
  );
  
}

export default Color
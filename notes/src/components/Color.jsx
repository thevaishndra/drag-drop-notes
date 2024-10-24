import React from 'react'
import {useContext} from 'react';
import {NoteContext} from '../context/NoteContext';

const Color = ({color}) => {
  const {selectedNote} = useContext(NoteContext)
    const changeColor = () => {
        console.log(selectedNote)
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
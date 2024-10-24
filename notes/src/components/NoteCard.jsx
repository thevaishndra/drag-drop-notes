import { useRef, useEffect, useState } from "react";// useRef - directly interact with dom element; useEffect - modifying dom after rendering
// import Trash from "../icons/Trash";//delete icon
import { db } from "../appwrite/databases";
import DeleteButton from "./DeleteButton";
import Spinner from "../icons/Spinner";
import { setNewOffset, autoGrow, setZIndex, bodyParser } from "../utils";
import {useContext} from "react";
import { NoteContext } from "../context/NoteContext";

const NoteCard = ({ note }) => {//note prop is a string which is converted to js objects
  const [saving, setSaving] = useState(false);
  const keyUpTimer = useRef(null);

  const {setSelectedNote} = useContext(NoteContext);

  const [position, setPosition] = useState(JSON.parse(note.position));//dynamic position
  const colors = JSON.parse(note.colors);
  const body = bodyParser(note.body);

  let mouseStartPos = {x : 0, y : 0};//initial position
  const cardRef = useRef(null)//points the card


  const textAreaRef = useRef(null);//allowing direct manipulation to fit the text in the card

  useEffect(() => {//calls the autoGrow function to adjust the textarea height based on its content
    autoGrow(textAreaRef);//automatically adjust the height of the text area
    setZIndex(cardRef.current);
  }, []);


  const mouseDown = (e) => {
     if (e.target.classList.contains("card-header")) {
    
    mouseStartPos.x = e.clientX//storing horizontal x position
    mouseStartPos.y = e.clientY//storing vertical y position

    document.addEventListener('mousemove', mouseMove);//whenever the mouse moves call function -> starts dragging
    document.addEventListener("mouseup", mouseUp);//when mouse button is released call function -> stops dragging

    setZIndex(cardRef.current)//clicked card to the front
    setSelectedNote(note);
     }
  }

  const mouseMove = (e) => {
    //1 - Calculate move direction
    const mouseMoveDir = {
      //how far mouse have moved since the last position
      x: mouseStartPos.x - e.clientX, //moved right -> 2 - 3 = -1; moved left -> 2 - (-3) = 5
      y: mouseStartPos.y - e.clientY, //moved down -> 2 - (-3) = 5; moved up -> 2 - 3 = -1
    };

    // console.log("mouseMoveDir", mouseMoveDir);
    //2 - Update start position for next move.
    mouseStartPos.x = e.clientX;
    mouseStartPos.y = e.clientY;

    const newPosition = setNewOffset(cardRef.current, mouseMoveDir);//calculates new positions for a card based on the mouse movement, ensuring the card stays within bounds

    //3 - Update card top and left position.
    setPosition(newPosition);
  }


  const mouseUp = () =>{//stops calculating the direction and stuff

    document.removeEventListener("mousemove", mouseMove);
    document.removeEventListener("mouseup", mouseUp);//prevents itself being called multiple times

    const newPosition = setNewOffset(cardRef.current);
    saveData("position", newPosition);
    // db.notes.update(note.$id, {position : JSON.stringify(newPosition)}); 
  }

 const saveData = async (key, value) => {//save notes position
   const payload = { [key]: JSON.stringify(value) };
   try {
     await db.notes.update(note.$id, payload);//payload -> The data you want to update, it will contain new value
   } catch (error) {
     console.error(error);
   }
   setSaving(false);//indicating save operation is completed
 };

 const handleKeyUp = () => {
   // save user input in a text area
   setSaving(true); //indicating save operation is in progress

   if (keyUpTimer.current) {
     clearTimeout(keyUpTimer.current); //If there’s already a timer set (i.e., the user has typed something and hasn't stopped for 2 seconds), this line clears that timer
   }

   keyUpTimer.current = setTimeout(() => {
     saveData("body", textAreaRef.current.value); //body: key that represents the part of the note being saved
   }, 2000); //call the saveData function after 2000 milliseconds (2 seconds)
 }

  return (
    <div
      ref={cardRef}
      className="card absolute w-[400px] rounded-lg shadow-card cursor-pointer"
      style={{
        backgroundColor: colors.colorBody,
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      <div
        onMouseDown={mouseDown}
        className="card-header flex justify-between items-center rounded-t-lg p-2"
        style={{ backgroundColor: colors.colorHeader }}
      >
        {/* <Trash /> */}
        <DeleteButton noteId={note.$id} /*setNotes={setNotes}*/ />
        
        {saving && ( //if save option is in progress then perform
          <div className="flex items-center gap-1 card-saving">
            <Spinner color={colors.colorText} />
            <span style={{ color: colors.colorText }}>Saving...</span>
          </div>
        )}
      </div>

      <div className="card-body p-4 rounded-b-lg">
        <textarea
          onKeyUp={handleKeyUp}
          ref={textAreaRef} //attaches ref for manipulating text area
          className="bg-inherit border-none w-full h-full resize-none text-base focus:outline-none"
          style={{ color: colors.colorText }} //inline styling in react is 2 braces
          defaultValue={body} //sets initial content of the text area
          onInput={() => {
            autoGrow(textAreaRef); //Calls autoGrow on input to adjust the height dynamically
          }}
          onFocus={() => {
            setZIndex(cardRef.current);
            setSelectedNote(note);
          }}
        ></textarea>
      </div>
    </div>
  );
};

export default NoteCard;

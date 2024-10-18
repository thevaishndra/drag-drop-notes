import { useRef, useEffect, useState } from "react";// useRef - directly interact with dom element; useEffect - modifying dom after rendering
import Trash from "../icons/trash";//delete icon
import { setNewOffset, autoGrow, setZIndex } from "../utils";

const NoteCard = ({ note }) => {//note prop is a string which is converted to js objects
  const [position, setPosition] = useState(JSON.parse(note.position));//dynamic position
  const colors = JSON.parse(note.colors);
  const body = JSON.parse(note.body);

  let mouseStartPos = {x : 0, y : 0};
  const cardRef = useRef(null)


  const textAreaRef = useRef(null);//allowing direct manipulation

  useEffect(() => {//calls the autoGrow function to adjust the textarea height based on its content
    autoGrow(textAreaRef);
  }, []);


  const mouseDown = (e) => {
    mouseStartPos.x = e.clientX
    mouseStartPos.y = e.clientY

    document.addEventListener('mousemove', mouseMove);
    document.addEventListener("mouseup", mouseUp);

    setZIndex(cardRef.current)
  }

  const mouseMove = (e) => {
    //1 - Calculate move direction
    const mouseMoveDir = {
      x: mouseStartPos.x - e.clientX,
      y: mouseStartPos.y - e.clientY,
    };

    console.log("mouseMoveDir", mouseMoveDir);
    //2 - Update start position for next move.
    mouseStartPos.x = e.clientX;
    mouseStartPos.y = e.clientY;

    const newPosition = setNewOffset(cardRef.current, mouseMoveDir)

    //3 - Update card top and left position.
    setPosition(newPosition);
  }


  const mouseUp = () =>{
    document.removeEventListener("mousemove", mouseMove);
    document.removeEventListener("mouseup", mouseUp);
  }

  return (
    <div
      ref = {cardRef}
      className="card absolute w-[400px] rounded-lg shadow-card cursor-pointer"
      style={{
        backgroundColor: colors.colorBody,
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}>

      <div
      onMouseDown = {mouseDown}
        className="card-header flex justify-between items-center rounded-t-lg p-2"
        style={{ backgroundColor: colors.colorHeader }}>
        <Trash />
      </div>

      <div className="card-body p-4 rounded-b-lg">
        <textarea
          ref={textAreaRef}//attaches ref for manipulating text area
          className="bg-inherit border-none w-full h-full resize-none text-base focus:outline-none"
          style={{ color: colors.colorText }}
          defaultValue={body}//sets initial content of the text area
          onInput={() => {
            autoGrow(textAreaRef); //Calls autoGrow on input to adjust the height dynamically
          }}
          onFocus={() => {
            setZIndex(cardRef.current)
          }}></textarea>
      </div>

    </div>
  );
};

export default NoteCard;

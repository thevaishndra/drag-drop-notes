import Plus from '../icons/Plus'
import colors from '../assets/colors.json'
import { useRef } from 'react'
import {db} from '../appwrite/databases'
import { useContext } from 'react'
import {NoteContext} from '../context/NoteContext'

const AddButton = () => {
  const {setNotes} = useContext(NoteContext);
  const startingPos = useRef(10)

  const addNote = async () => {
    const payload = {
      position:JSON.stringify({
        x:startingPos.current,
        y:startingPos.current
      }),
      colors:JSON.stringify(colors[0]),
    };
    startingPos.current += 10;

    const response = await db.notes.create(payload);
    setNotes((prevState) => [response, ...prevState]);
  };
  return (
    <div className="bg-[#6b6b6b] flex justify-center items-center h-10 w-10
     rounded-full cursor-pointer transition-all duration-300 hover:h-[45px] hover:w-[45px]"
     onClick={addNote}>
      <Plus />
    </div>
  );
}

export default AddButton
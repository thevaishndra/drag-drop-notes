import NoteCard from "../components/NoteCard.jsx";
import { useContext } from "react";
import { NoteContext } from "../context/NoteContext.jsx";
import Controls from "../components/Controls.jsx";


const NotesPage = () => {
  const { notes } = useContext(NoteContext);//access the notes stored in global context
  
  
  return (
    <div>
      {notes.map((note) => (//loop notes and render noteCard for each note
        <NoteCard key={note.$id} note={note}  />
      ))}
      <Controls />
    </div>
  );
};

export default NotesPage;

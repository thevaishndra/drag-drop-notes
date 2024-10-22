// import {useState, useEffect} from "react";
// import { fakeData as notes } from "../assets/fakeData.js";
// import { db } from "../appwrite/databases.js";//instead of fake data we will take this now
// import {databases} from "../appwrite/config.js"
import NoteCard from "../components/NoteCard.jsx";
import { useContext } from "react";
import { NoteContext } from "../context/NoteContext.jsx";

const NotesPage = () => {
  const { notes } = useContext(NoteContext);
  // const [notes, setNotes] = useState([]);

  // useEffect(() => {
  //   init()
  // }, [])

  // const init = async () => {
  //   // fetches the list of notes from the database when the component mounts -> when first rendered
  //   const response = await db.notes.list();

  //   // const response = await databases.listDocuments(
  //   //   import.meta.env.VITE_DATABASE_ID,
  //   //   import.meta.env.VITE_COLLECTION_NOTES_ID
  //   // );

  //   setNotes(response.documents);//response is stored in notes
  // }
  
  return (
    <div>
      {notes.map((note) => (
        <NoteCard key={note.$id} note={note} /*setNotes={setNotes}*/ />
      ))}
    </div>
  );
};

export default NotesPage;

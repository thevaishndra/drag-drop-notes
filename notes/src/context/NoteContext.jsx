/*The Context API allows you to create a global state that can be accessed by any component in your app, 
no matter where it is in the component tree.
This way, you don’t have to pass props down manually at every level (also called "prop drilling")*/
import { createContext, useEffect, useState } from "react";
import Spinner from "../icons/Spinner";
import { db } from "../appwrite/databases";


export const NoteContext = createContext();

const NoteProvider = ({ children }) => {
    const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedNote, setSelectedNote] = useState(null);

   useEffect(() => {
     init();
   }, []);

  const init = async () => {
    const response = await db.notes.list();
    setNotes(response.documents); 
    setLoading(false);//loading spinner
  };
  const contextData = { notes, setNotes, selectedNote, setSelectedNote };

  return (
    <NoteContext.Provider value={contextData}>
      {loading ? (
        <div className="flex items-center justify-center h-screen ">
          <Spinner size="100" />
        </div>
      ) : (
        children
      )}
    </NoteContext.Provider>
  );
};

export default NoteProvider;
//This setup makes the notes accessible to any part of your app without passing props around.
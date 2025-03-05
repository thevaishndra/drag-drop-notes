/*The Context API allows you to create a global state that can be accessed by any component in your app, 
no matter where it is in the component tree.
This way, you don’t have to pass props down manually at every level (also called "prop drilling")*/
import { createContext, useEffect, useState } from "react";
import Spinner from "../icons/Spinner";
import { db } from "../appwrite/databases";


export const NoteContext = createContext();//creates react context - allows component inside noteprovider to acess shared data

const NoteProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedNote, setSelectedNote] = useState(null);

   useEffect(() => {
     init();
   }, []);

  const init = async () => {
    const response = await db.notes.list();//fetch notes from appwrite
    setNotes(response.documents); //store notes in state
    setLoading(false);//stop showing loading spinner
  };
  const contextData = { notes, setNotes, selectedNote, setSelectedNote };//object that hold these data

  return (
    <NoteContext.Provider value={contextData}>{/*making data access globally*/}
      {loading ? (
        <div className="flex items-center justify-center h-screen ">
          <Spinner size="100" />
        </div>
      ) : (
        children //app's context
      )} 
    </NoteContext.Provider>
  );
};

export default NoteProvider;
//This setup makes the notes accessible to any part of your app without passing props around.
import { createContext, useEffect, useState } from "react";
import Spinner from "../icons/Spinner";
import { db } from "../appwrite/databases";


export const NoteContext = createContext();

const NoteProvider = ({ children }) => {
    const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

   useEffect(() => {
     init();
   }, []);

  const init = async () => {
    const response = await db.notes.list();
    setNotes(response.documents); 
    setLoading(false);
  };
  const contextData = { notes, setNotes };

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

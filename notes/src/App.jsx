import React from "react";
import NotesPage from "./pages/NotesPage";
import NoteProvider from "./context/NoteContext";

function App() {
  return (
    <>
      <div id="app" className="h-screen bg-gray-900  relative overflow-auto">
        <NoteProvider>
          <NotesPage />
        </NoteProvider>
        {/* you need to wrap your entire app or the relevant parts of it with the
        NoteProvider so that the notes can be accessible in any component */}
      </div>
    </>
  );
}

export default App;
// voice to text notes -> play option after onclick change it to stop option 
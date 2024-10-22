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
      </div>
    </>
  );
}

export default App;

import React from "react";
import NotesPage from "./pages/NotesPage";

function App() {
  return (
    <>
      <div
        id="app"
        className="h-screen bg-gray-900  relative overflow-auto"
      >
        <NotesPage />
      </div>
    </>
  );
}

export default App;

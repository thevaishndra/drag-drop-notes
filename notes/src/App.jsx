import { useState } from 'react'
import NotesPage from './pages/NotesPage'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div id="app">
        <NotesPage />
      </div>
    </>
  );
}

export default App

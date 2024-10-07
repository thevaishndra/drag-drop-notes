import React from 'react'

const NoteCard = ({note}) => {
    let position = JSON.parse(note.position);
    const colors = JSON.parse(note.colors)
    const body = JSON.parse(note.body);
  return (
    <div className ='card' 
    style = {{
        backgroundColor : colors.colorBody,
        }} >
            {body}
    </div>
  )
}

export default NoteCard
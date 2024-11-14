import React, { useState } from "react";

export default function NotesSection() {
  const [notes, setNotes] = useState<string[]>([]);
  const [note, setNote] = useState("");

  const addNote = () => {
    setNotes([...notes, note]);
    setNote("");
  };

  return (
    <div>
      <textarea value={note} onChange={(e) => setNote(e.target.value)} />
      <button onClick={addNote}>Add Note</button>
      <div>
        {notes.map((note, index) => (
          <p key={index}>{note}</p>
        ))}
      </div>
    </div>
  );
}

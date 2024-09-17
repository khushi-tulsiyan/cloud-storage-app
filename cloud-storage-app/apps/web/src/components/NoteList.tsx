// components/NoteList.tsx
import { useState } from 'react';
import { trpc } from '../utils/trpc';
import NoteEdit from './NoteEdit';

const NoteList = () => {
  const { data: notes } = trpc.note.getNotesByUserId.useQuery({ userId: "userId" });
  const [editingNote, setEditingNote] = useState(null);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Your Notes</h2>
      <ul>
        {notes?.map((note) => (
          <li key={note.id} className="p-2 border border-gray-200">
            <h3 className="text-lg font-semibold">{note.title}</h3>
            <p>{note.content}</p>
            <button onClick={() => setEditingNote(note)} className="bg-yellow-500 text-white p-2">
              Edit
            </button>
          </li>
        ))}
      </ul>

      {editingNote && <NoteEdit note={editingNote} />}
    </div>
  );
};

export default NoteList;

import React, { useState } from 'react';
import { trpc } from '../utils/trpc';

const Notes = () => {
  const [noteContent, setNoteContent] = useState('');
  const { mutate: createNote, isLoading } = trpc.createNote.useMutation();

  const handleCreateNote = () => {
    createNote(
      { userId: 'your-session-user-id', content: noteContent },
      {
        onSuccess: () => {
          setNoteContent('');
          // Optionally refetch the notes here
        },
      }
    );
  };

  return (
    <div>
      <h3>Notes</h3>
      <textarea
        value={noteContent}
        onChange={(e) => setNoteContent(e.target.value)}
        className="w-full p-2 border rounded mt-2"
      />
      <button
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleCreateNote}
        disabled={isLoading}
      >
        Create Note
      </button>
    </div>
  );
};

export default Notes;

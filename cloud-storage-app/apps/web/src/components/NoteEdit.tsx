// components/NoteEdit.tsx
import { useState } from 'react';
import { trpc } from '../utils/trpc';

const NoteEdit = ({ note }) => {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const editNoteMutation = trpc.note.update.useMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await editNoteMutation.mutateAsync({
      id: note.id,
      title,
      content,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <h2 className="text-xl font-bold">Edit Note</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-2 border mt-2"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 mt-2">
        Update
      </button>
    </form>
  );
};

export default NoteEdit;

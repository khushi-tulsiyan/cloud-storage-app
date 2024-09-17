// components/NoteCreate.tsx
import { useState } from 'react';
import { trpc } from '../utils/trpc';

const NoteCreate = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const createNoteMutation = trpc.note.create.useMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createNoteMutation.mutateAsync({
      title,
      content,
      userId: "userId",
    });
    setTitle('');
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <h2 className="text-xl font-bold">Create Note</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="w-full p-2 border"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
        className="w-full p-2 border mt-2"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 mt-2">
        Create
      </button>
    </form>
  );
};

export default NoteCreate;

import { trpc } from '../utils/trpc';
import { useState } from 'react';

const NotePage = () => {
  const createNote = trpc.note.createNote.useMutation();
  const { data: notes } = trpc.note.getNotes.useQuery();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async () => {
    await createNote.mutateAsync({ title, content });
    setTitle('');
    setContent('');
  };

  return (
    <div>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
      <textarea value={content} onChange={(e) => setContent(e.target.value)} />
      <button onClick={handleSubmit}>Create Note</button>

      <div>
        {notes?.map((note) => (
          <div key={note.id}>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotePage;

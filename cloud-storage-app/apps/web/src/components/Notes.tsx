export default function Notes() {
    const { data: notes, refetch } = trpc.note.getAll.useQuery();
    const createNote = trpc.note.create.useMutation();
  
    const handleCreate = (title: string, content: string) => {
      createNote.mutate({ title, content, userId: 'user-123' }, { onSuccess: refetch });
    };
  
    return (
      <div className="notes">
        <h2>My Notes</h2>
        <button onClick={() => handleCreate('New Note', 'Note content')}>Create Note</button>
        {notes?.map(note => (
          <div key={note.id}>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
          </div>
        ))}
      </div>
    );
  }
  
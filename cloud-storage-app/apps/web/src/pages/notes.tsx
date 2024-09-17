import NoteCreate from '../components/NoteCreate';
import NoteList from '../components/NoteList';

const NotesPage = () => {
  return (
    <div>
      <h1>Notes</h1>
      <NoteCreate />
      <NoteList />
    </div>
  );
};

export default NotesPage;

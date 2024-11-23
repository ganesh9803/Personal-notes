import { useState, useEffect } from 'react';
import axios from 'axios';
import NoteForm from '../components/NoteForm';
import NoteList from '../components/NoteList';
import SearchBar from '../components/SearchBar';
import EditNoteForm from '../components/EditNoteForm';

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [editingNote, setEditingNote] = useState(null);
  const [showNoteForm, setShowNoteForm] = useState(false); // State for form visibility

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    fetchNotes();
  }, [searchQuery, selectedCategory]);

  const fetchNotes = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/notes/get`, {
        params: { search: searchQuery, category: selectedCategory },
      });
      setNotes(response.data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const addNote = async (note) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/notes/add`, note);
      setNotes([response.data, ...notes]);
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  const deleteNote = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/notes/${id}`);
      setNotes(notes.filter((note) => note._id !== id));
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  const updateNote = async (id, updatedNote) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/api/notes/${id}`, updatedNote);
      setNotes(notes.map((note) => (note._id === id ? response.data : note)));
      setEditingNote(null); // Close the edit form
    } catch (error) {
      console.error('Error updating note:', error);
    }
  };

  const toggleNoteForm = () => {
    setShowNoteForm(!showNoteForm); // Toggle the form visibility
  };

  return (
    <div className="home mx-auto max-w-4xl p-4">
      <h1>Personal Notes Manager</h1>
      <SearchBar setSearchQuery={setSearchQuery} setSelectedCategory={setSelectedCategory} />

      {/* Toggle Create Note Button */}
      <button
        onClick={toggleNoteForm}
        className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 mb-4"
      >
        {showNoteForm ? 'Cancel' : 'Create Note'}
      </button>

      {/* Conditionally render NoteForm */}
      {showNoteForm && (
        <NoteForm addNote={addNote} closeForm={toggleNoteForm} />
      )}

      {editingNote ? (
        <EditNoteForm
          note={editingNote}
          updateNote={updateNote}
          cancelEdit={() => setEditingNote(null)}
        />
      ) : (
        <>
          <NoteList
            notes={notes}
            deleteNote={deleteNote}
            updateNote={updateNote}
            setEditingNote={setEditingNote}
          />
        </>
      )}
    </div>
  );
};

export default Home;
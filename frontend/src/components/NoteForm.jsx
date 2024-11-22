import { useState } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes

const NoteForm = ({ addNote, closeForm }) => {
  const [note, setNote] = useState({
    title: '',
    description: '',
    category: 'Others',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNote({ ...note, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!note.title || !note.description) {
      alert('Title and Description are required.');
      return;
    }
    addNote(note);
    setNote({ title: '', description: '', category: 'Others' });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="note-form bg-white shadow-md rounded-lg p-6 mb-6"
    >
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={note.title}
        onChange={handleChange}
        className="w-full mb-4 p-3 border rounded-lg focus:ring focus:ring-blue-300"
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        value={note.description}
        onChange={handleChange}
        className="w-full mb-4 p-3 border rounded-lg focus:ring focus:ring-blue-300"
        required
      />
      <select
        name="category"
        value={note.category}
        onChange={handleChange}
        className="w-full mb-4 p-3 border rounded-lg focus:ring focus:ring-blue-300"
      >
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
        <option value="Others">Others</option>
      </select>
      <div className="flex justify-between">
        <button
          type="button"
          onClick={closeForm}  // Close the form
          className="bg-gray-400 text-white py-2 px-4 rounded-lg hover:bg-gray-500"
        >
          Close
        </button>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
        >
          Add Note
        </button>
      </div>
    </form>
  );
};

// Add PropTypes for validation
NoteForm.propTypes = {
  addNote: PropTypes.func.isRequired,  
  closeForm: PropTypes.func.isRequired,  
};

export default NoteForm;

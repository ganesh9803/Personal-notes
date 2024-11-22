import { useState } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes

const NoteList = ({ notes, deleteNote, updateNote, setEditingNote }) => {
  const [selectedNote, setSelectedNote] = useState(null); // Track the selected note

  const handleSelectNote = (note) => {
    // Set the clicked note as selected, and collapse it if it's already selected
    setSelectedNote((prevNote) => (prevNote?._id === note._id ? null : note));
  };

  return (
    <div className="note-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
      {notes.length > 0 ? (
        notes.map((note) => (
          <div
            className="note-item bg-white shadow-md rounded-lg p-4 flex flex-col"
            key={note._id}
          >
            {/* Display only title and category initially */}
            <h3
              className="text-xl font-semibold mb-2 cursor-pointer"
              onClick={() => handleSelectNote(note)} // Toggle full details on click
            >
              {note.title}
            </h3>
            <p className="mb-2">
              <strong>Category:</strong> {note.category}
            </p>

            {/* Show full details only for the selected note */}
            {selectedNote && selectedNote._id === note._id && (
              <div className="full-details mt-4">
                <p className="mb-2">{note.description}</p>
                <p className="mb-2">
                  <strong>Created At:</strong> {new Date(note.created_at).toLocaleString()}
                </p>
                <div className="flex space-x-2">
                  <button
                    onClick={() => deleteNote(note._id)}
                    className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => setEditingNote(note)}
                    className="bg-blue-500 text-white py-1 px-3 rounded-lg hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() =>
                      updateNote(note._id, { ...note, completed: !note.completed })
                    }
                    className={`w-full py-1 px-3 rounded-lg ${
                      note.completed
                        ? 'bg-green-500 hover:bg-green-600'
                        : 'bg-yellow-500 hover:bg-yellow-600'
                    }`}
                  >
                    {note.completed ? 'Mark Incomplete' : 'Mark Complete'}
                  </button>
                </div>
              </div>
            )}
          </div>
        ))
      ) : (
        <p className="col-span-full text-center text-gray-500">No notes available.</p>
      )}
    </div>
  );
};

// Add PropTypes for validation
NoteList.propTypes = {
  notes: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      created_at: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    })
  ).isRequired,
  deleteNote: PropTypes.func.isRequired,
  updateNote: PropTypes.func.isRequired,
  setEditingNote: PropTypes.func.isRequired,
};

export default NoteList;

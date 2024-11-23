//backend/routes/notes.js

import express from 'express';
import Note from '../models/Note.js';
import noteValidation from '../validation/noteValidation.js';

const router = express.Router();

// Create Note
router.post('/add', async (req, res) => {
  const { error } = noteValidation.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const note = new Note(req.body);
    await note.save();
    res.status(201).json(note);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create note' });
  }
});

// Get All Notes
router.get('/get', async (req, res) => {
  const { category, search } = req.query;
  const filter = {};
  if (category) filter.category = category;
  if (search) filter.title = { $regex: search, $options: 'i' };

  try {
    const notes = await Note.find(filter).sort({ created_at: -1 });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch notes' });
  }
});

// Update Note
router.put('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const note = await Note.findByIdAndUpdate(id, req.body, { new: true });
    if (!note) return res.status(404).json({ error: 'Note not found' });
    res.json(note);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update note' });
  }
});

// Delete Note
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const note = await Note.findByIdAndDelete(id);
    if (!note) return res.status(404).json({ error: 'Note not found' });
    res.json({ message: 'Note deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete note' });
  }
});

export default router;

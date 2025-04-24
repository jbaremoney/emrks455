const express = require('express');
const router = express.Router();
const notesController = require('./notesController');

// Create a new note
router.post('/', notesController.createNote);


module.exports = router;

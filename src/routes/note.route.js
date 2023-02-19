import express from 'express';
import * as noteController from '../controllers/note.controller';
import { newNoteValidator } from '../validators/note.validator';
import  {userAuth}  from '../middlewares/auth.middleware';

const router = express.Router();

//route to create a new note
router.post('/create', newNoteValidator,userAuth, noteController.createNewNote);

//route to get all notes
router.get('/allNote',userAuth ,noteController.getAllNotes);

//router to get a note by id
router.get('/:_id',userAuth, noteController.getNote);

//route to update a note
router.put('/:_id',userAuth, noteController.updateNote);

//route to delete a note
router.delete('/:_id',userAuth, noteController.deleteNote);

//route for archivenote
router.put('/:_id/Archive',userAuth,noteController.archiveNote);

//route for Trash
router.put('/:_id/Trash',userAuth,noteController.trashNote);

export default router;
import HttpStatus from 'http-status-codes';
import * as NoteService from '../services/note.service';


/**
 * Controller to create a new note
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const createNewNote = async (req, res, next) => {
  try {
    const data = await NoteService.createNewNote(req.body);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'new note is created successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to get all notes
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
 export const getAllNotes = async (req, res, next) => {
  try {
    const data = await NoteService.getAllNotes(req.body.userID);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'all notes are fetched successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to get Note for particular user using id
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
 export const getNote = async (req, res, next) => {
  try {
    const data = await NoteService.getNote(req.params._id,req.body.userID);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'Particular note get successfully!!...'
    });
  } catch (error) {
    next(error);
  }
};

 /**
 * Controller to update a note by id
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
  export const updateNote = async (req, res, next) => {
    try {
      const data = await NoteService.updateNote(req.params._id, req.body);
      res.status(HttpStatus.ACCEPTED).json({
        code: HttpStatus.ACCEPTED,
        data: data,
        message: 'Note updated successfully!!.....'
      });
    } catch (error) {
      next(error);
    }
};

/**
 * Controller to delete a Note
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
 export const deleteNote = async (req, res, next) => {
  try {
    await NoteService.deleteNote(req.params._id);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: [],
      message: 'Note deleted successfully!!!....'
    });
  } catch (error) {
    next(error);
  }
};

export const archiveNote = async(req,res,next)=>{
  try {
    const data = await NoteService.archiveNote(req.params._id);
    res.status(HttpStatus.ACCEPTED).json({
      code:HttpStatus.ACCEPTED,
      data:data,
      message:`note Archived successfilly`
    });
  } catch (error) {
    next(error);
  }
};

export const trashNote = async(req,res,next)=>{
  try {
    const data = await NoteService.trashNote(req.params._id);
    res.status(HttpStatus.ACCEPTED).json({
      code:HttpStatus.ACCEPTED,
      data: data,
      message:`note Trash successfully`
    })
  } catch (error) {
    
  }
}


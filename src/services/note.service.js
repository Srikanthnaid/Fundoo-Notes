import Note from '../models/note.model';

//create new note
export const createNewNote = async (body) => {
    const data = await Note.create(body);
    return data;
};

//get all notes
export const getAllNotes = async (userID) => {
    const data = await Note.find({userID:userID});
    return data;
};

//get note by id
export const getNote = async (_id,userID) => {
    console.log(userID);
    const data = await Note.findOne({_id:_id,userID:userID});
    return data;
};

//update note by _id
export const updateNote = async (_id,body) => {
    const data = await Note.findOneAndUpdate(
      {
        _id:_id,
        userID:body.userID
      },
      body,
      {
        new: true
      }
    );
    return data;
};

//delete note by _id
export const deleteNote = async (_id) => {
    const data = await Note.findOneAndDelete({id:_id});
    return data;
};

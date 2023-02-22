import { json } from 'express';
import Note from '../models/note.model';
import { redisClient } from '../config/redis';

//create new note
export const createNewNote = async (body) => {
  const data = await Note.create(body);
  await redisClient.del('user-' + body.userId + '-all-notes');
  return data;
};

//get all notes
export const getAllNotes = async (userID) => {
  const data = await Note.find({ userID: userID });
  await redisClient.set('user-' + userID + '-all-notes', JSON.stringify(data));
  return data;
};

//get note by id
export const getNote = async (_id, userID) => {
  console.log(userID);
  const data = await Note.findOne({ _id: _id, userID: userID });
  await redisClient.set('user-'+userID+'-note-'+_id, JSON.stringify(data));
  return data;
};

//update note by _id
export const updateNote = async (_id, body) => {
  const data = await Note.findOneAndUpdate(
    {
      _id: _id,
      userID: body.userID
    },
    body,
    {
      new: true
    }
  );
  await redisClient.del('user-' + body.userID + '-all-notes');
  await redisClient.del('user-' + body.userID + '-note-' + _id);
  return data;
};

//delete note by _id
export const deleteNote = async (_id) => {
  const data = await Note.findOneAndDelete({ id: _id });
  await redisClient.del(_id);

  return data;
};

//Archive note.
export const archiveNote = async (_id) => {
  const data = await Note.findByIdAndUpdate(
    {
      _id: _id
    },
    {
      isArchive: true
    },
    {
      new: true
    }
  );
  await redisClient.del( _id);
  return data;
};

//Trash note.
export const trashNote = async (_id) => {
  const data = await Note.findByIdAndUpdate({
    _id: _id
  },
    {
      isTrash: true
    },
    {
      new: true
    }
  );
  await redisClient.del(_id)
  return data;
};

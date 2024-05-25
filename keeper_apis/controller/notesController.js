import Notes from "../models/notesModel.js";
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';


export const createNote = async(req,res,next) => {
    const {title,content,userId} = req.body;
    const note = new Notes({title,content,userId});
    await note.save();
    res.status(201).json(note);
}


export const getNotes = async (req, res,next) => {
    const {userId} = req.body;
    const userIdObject = new mongoose.Types.ObjectId(userId);
    const notes = await Notes.find({ userId: userIdObject });
    notes.reverse();
    res.status(200).json(notes);
}


export const deleteNote = async (req, res,next) => {
    const {_id} = req.body;
    console.log(_id);
    const noteIdObject = new mongoose.Types.ObjectId(_id);
    await Notes.deleteOne({ _id: noteIdObject });
    res.status(200).json({message:"Note Deleted"});
}
import express from 'express';
import { createNote,getNotes,deleteNote } from '../controller/notesController.js';
import {verifyUser} from '../utils/verifyUser.js'
const notesRoute = express.Router();

notesRoute.post("/",createNote);
notesRoute.post("/get_notes",getNotes);
notesRoute.delete("/delete-Note",deleteNote);
export default notesRoute;
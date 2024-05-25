import mongoose from "mongoose";
const notesschema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    content:{
        type:String,
    }
    ,
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    },
    {timestamps:true}
);

const Notes = mongoose.model('Notes',notesschema);
export default Notes;
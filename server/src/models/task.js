import mongoose from "mongoose";
// creating a schema model for task
const taskSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    completed:{
        type:Boolean,
        required:true,
    },
},{timestamps:true});

// giving it a name : Task
const Task = mongoose.model('Task',taskSchema);

export default Task;
import Task from "../models/task.js";

export const getTask = async (req,res) => {
    try {
        const tasks = await Task.find({ user: req.user._id });
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Error in getting all Tasks', error:error.message });
    }
};
export const createTask = async (req,res) => {
    try {
        const { title, description, completed } = req.body;
        const newTask = await Task.create(
            {
                title,
                description,
                completed,
                user:req.user._id
            }
        );
        await newTask.save()
        res.status(201).json(newTask);

    } catch (error) {
        res.status(500).json({ message: 'Error creating task', error: error.message });
    }
};
export const updateTask = async (req,res) => {
    const { id } = req.params;
    const { title, description, completed } = req.body;
    try {
        const updatedTask = await Task.findByIdAndUpdate('id', { title, description, completed }, {new:true});
        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json(updatedTask)
    } catch (error) {
        res.status(500).json({ message: 'Error updating task', error: error.message });
    }
    
};
export const deleteTask = async (req,res) => {
    const { id } = req.params;
    try {
        const task = await Task.findByIdAndDelete(id);
        if(!task){
            return res.status(404).json({ message: 'Task not Found' })
        }
        res.status(200).json({ message: "Task Deleted Successfully" })
    } catch (error) {
        res.status(500).json({ message: "Error deleting task" });
    }
};
export const getTaskById = async (req,res) => {
    const { id } = req.params;
    try {
        const task = await Task.findById(id); // Find task by ID
        if (!task) {
          return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json(task); // Send the task back as JSON
      } catch (error) {
        res.status(500).json({ message: "Error fetching task" });
      }
}
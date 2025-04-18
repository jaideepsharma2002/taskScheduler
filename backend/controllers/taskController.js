const asyncHandler = require("express-async-handler");
const Task = require("../models/taskModel");

const createTask = asyncHandler( async (req,res) => {
    const { title, type } = req.body;
    if (!title || !type) {
        res.status(400);
        throw new Error("All the feilds are mandatory!");
    }
    console.log("Userid", req.user.id)
    const task = await Task.create({
        userid: req.user.id,
        title,
        type
    });

    console.log("task", task);

    if (task) {
        res.status(200).json({_id: task.id});
    }
    else {
        res.status(400).json("Task is not valid!");
    }
});

const getAllTask = asyncHandler( async(req,res) => {


    try {

    const userid = req.user.id;

    const alltask = await Task.find({userid});

    res.status(200).json(alltask);
    
    }
    catch(e) {
        res.status(500).json("Error in fetching the user tasks!");
    }
})



const editTask = asyncHandler( async (req,res) => {

    try {

        const taskid = req.params.id;
        const {title} = req.body;

        const updatedTask = await Task.findOneAndUpdate(
            {_id: taskid},
            {title},
            {new: true}
        );

        if (!updatedTask) {
            return res.status(404).json({message:"Task not found"});
        }

        res.json(updatedTask);
    }
    catch(e) {
        res.status(500).json("error in updating task!");
    }

})

const deleteTask = asyncHandler( async(req,res)=>{

    try {

        const task = await Task.findByIdAndDelete(req.params.id);

        if (!task) {
            return res.status(400).json("Task not found!");
        }

        return res.status(200).json("task deleted successfully");

    }
    catch (e){
        return res.status(500).json("Error deleting the task");
    }

})


module.exports = {createTask,getAllTask,editTask,deleteTask};
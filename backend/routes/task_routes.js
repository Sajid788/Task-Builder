const express = require('express');
const { createTask, getTasks,updateTask,deleteTask } = require("../controller/task_controller");
const TaskRouter = express.Router();
// const  {authorization} = require("../middleware.js/authorization")

TaskRouter.post("/", createTask);
TaskRouter.get("/", getTasks);
TaskRouter.put('/edit/:id', updateTask);
TaskRouter.delete("/:id", deleteTask);

module.exports = {TaskRouter}

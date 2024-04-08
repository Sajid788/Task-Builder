const express = require('express');
const { createTask, getTasks } = require("../controller/task_controller");
const TaskRouter = express.Router();

TaskRouter.post("/", createTask);
TaskRouter.get("/", getTasks);

module.exports = {TaskRouter}

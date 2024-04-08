const { TaskModel } = require("../model/task_model");


const getTasks = async (req, res) => {
  try {
    let query = {};

    if (req.query.startDate && req.query.endDate) {
      query.createdAt = {
        $gte: new Date(req.query.startDate),
        $lte: new Date(req.query.endDate),
      };
    }
    const tasks = await TaskModel.find(query);
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const createTask = async (req, res) => {
  try {
    const { name,id } = req.body;
    const task = new TaskModel({ name, status:"tasks",Date: new Date(),id});
    await task.save();
    res.status(201).json({ message: "Task created successfully", task });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {  getTasks, createTask };
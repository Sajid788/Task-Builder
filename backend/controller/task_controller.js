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
    const userId = req.userId
    const { name, id } = req.body;
    const task = new TaskModel({ name, status: "tasks", Date: new Date(), userId, id });
    await task.save();
    res.status(201).json({ message: "Task created successfully", task });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const task = await TaskModel.findById(id);
    console.log("Found Task:", task);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (status !== undefined) {
      task.status = status;
    }
    await task.save();
    res.status(200).json({ message: "Task updated successfully", task });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTask = await TaskModel.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted successfully", deletedTask });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { getTasks, createTask, updateTask, deleteTask };

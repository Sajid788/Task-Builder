const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  name: {type: String,required: true },
  status: {type: String, enum: ["tasks", "inProgress", "done", "rework"],default: "tasks"},
   Date: { type: Date, default: Date.now },
   id: {type: String},
});


const TaskModel = mongoose.model("Task", taskSchema);

module.exports = {TaskModel};

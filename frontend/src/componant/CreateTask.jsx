import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

const CreateTask = ({ tasks, setTasks }) => {
  const [newtask, newSetTask] = useState({
    id: "",
    name: "",
    status: "tasks",
  });
  // console.log(newtask)

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://task-backend-mu.vercel.app/task",
        { name: newtask.name, id: newtask.id, status:newtask.status }
      );
      const { task, message } = response.data;
      setTasks((prevTasks) => [...prevTasks, task]);
      //   console.log(response.data.message);
      newSetTask({
        id: "",
        name: "",
        status: "tasks",
      });
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="border-2 border-slate-400 Ibg-slate-100 rounded-md mr-4 h-10 w-64 px-1"
        value={newtask.name}
        onChange={(e) =>
          newSetTask({ ...newtask, id: uuidv4(), name: e.target.value })
        }
      />
      <button className="bg-cyan-500 rounded-md px-4 h-10 text-white">
        Create
      </button>
    </form>
  );
};

export default CreateTask;

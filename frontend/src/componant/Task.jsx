import React, { lazy, useEffect, useState } from "react";
import axios from "axios";
const CreateTask = lazy(() => import("./CreateTask"));
const ListTask= lazy(() => import("./ListTask"));
// import { DndProvider } from "react-dnd";
// import { HTML5Backend } from "react-dnd-html5-backend";

function Task() {
  const [tasks, setTasks] = useState([]);
  // console.log("tasks", tasks);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(
          "https://task-backend-mu.vercel.app/task"
        );
        setTasks(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTasks();
  }, []);

  return (
    // <DndProvider backend={HTML5Backend}>
      <div className="bg-slate-100 w-screen h-screen flex flex-col items-center gap-16 pt-32">
        <CreateTask tasks={tasks} setTasks={setTasks} />
        <ListTask tasks={tasks} setTasks={setTasks} />
      </div>
    // </DndProvider>
  );
}

export default Task;

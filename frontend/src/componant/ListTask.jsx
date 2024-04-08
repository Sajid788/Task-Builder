import { useEffect, useState } from "react";
import { useDrag, useDrop } from 'react-dnd';


const ListTasks = ({ tasks, setTasks }) => {
  const [todos, setTodos] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [done, setDone] = useState([]);
  const [rework, setRework] = useState([]);

  useEffect(() => {
    const fTodos = tasks.filter((task) => task.status === "task");
    const fInProgress = tasks.filter((task) => task.status === "in progress");
    const fDone = tasks.filter((task) => task.status === "done");
    const fRework = tasks.filter((task) => task.status === "rework");
    setTodos(fTodos);
    setInProgress(fInProgress);
    setDone(fDone);
    setRework(fRework);
  }, [tasks]);

  const statuses = ["task", "in progress", "done", "rework"];

  return (
    <div className="flex gap-16">
      {statuses.map((status, index) => (
        <Section
          key={index}
          status={status}
          tasks={tasks}
          setTasks={setTasks}
          todos={todos}
          inProgress={inProgress}
          done={done}
          rework={rework}
        />
      ))}
    </div>
  );
};

export default ListTasks;

const Section = ({
  status,
  tasks,
  setTasks,
  todos,
  inProgress,
  done,
  rework,
}) => {
    const [{ isOver }, drop] = useDrop(() => ({
        accept: "task",
        drop: (item) => addItemToSection(item.id),
        collect: (monitor) => ({
          isOver: !!monitor.isOver()
        })
      }))

  let text = "Todo";
  let bg = "bg-slate-500";
  let tasksToMap = tasks;

  if (status === "in progress") {
    text = "In Progress";
    bg = "bg-purple-500";
    tasksToMap = inProgress;
  }
  if (status === "done") {
    text = "Done";
    bg = "bg-green-500";
    tasksToMap = done;
  }
  if (status === "rework") {
    text = "Rework";
    bg = "bg-yellow-500";
    tasksToMap = rework;
  }

  const addItemToSection = (id) =>{
    try {
        setTasks((prev) =>{
            return prev.map((task) =>{
                if(task.id == id){
                    return {...task, status}
                }
                return task;
            })
        })
    } catch (error) {
        console.log(error)
    }
  }

  return (
    <div ref = {drop} className={`w-64 ${isOver ? "bg-slate-200" : ""}`}>
      <Header text={text} bg={bg} count={tasksToMap.length} />
      {tasksToMap.length > 0 && 
      tasksToMap.map((task) =>(
        <Task key = {task.id} tasks = {tasks} setTasks = {setTasks} task = {task}/>
      ))}
    </div>
  );
};

const Header = ({ text, bg, count }) => {
  return (
    <div
      className={`${bg} flex items-center h-12 pl-4 rounded-md uppercase text-sm text-white`}
    >
      {text}
      <div className="ml-2 bg-white w-5 h-5 text-black rounded-full flex items-center justify-center">
        {count}
      </div>
    </div>
  );
};

const Task = ({task, tasks, setTasks}) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "task",
        item: {id: task.id},
        collect: (monitor) => ({
          isDragging: !!monitor.isDragging()
        })
      }))
      console.log(isDragging)
    return (
      <div  ref = {drag} 
      className = {`relative p-4 mt-8 shadow-md rounded-md  cursor-grab ${isDragging ? "opacity-25" : "opacity-100"} `}>
       <p>{task.name}</p>
      </div>
      
      
    );
  };
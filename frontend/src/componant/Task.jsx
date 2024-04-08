import React, { useEffect, useState } from 'react'
import CreateTask from './CreateTask'
import ListTask from './ListTask';
import axios from "axios";

function Task() {
const [tasks, setTasks] = useState([]);
console.log("tasks", tasks)
 
useEffect(() =>{
    const fetchTasks = async () =>{
        try {
            const response = await axios.get("http://localhost:8080/task");
            setTasks(response.data)
            // console.log(response)
        } catch (error) {
        
            console.log(error)
        }
    };
    fetchTasks();
},[])



  return (
    <div className='bg-slate-100 w-screen h-screen flex flex-col items-center gap-16 pt-32'>
      <CreateTask tasks = {tasks} setTasks = {setTasks}/>
      <ListTask tasks = {tasks} setTasks = {setTasks}/>
    </div>
  )
}

export default Task
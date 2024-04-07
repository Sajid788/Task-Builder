import React, { useState } from 'react'
import CreateTask from './CreateTask'
import ListTask from './ListTask';

function Task() {
const [tasks, setTasks] = useState([]);

  return (
    <div className=''>
      <CreateTask tasks = {tasks} setTasks = {setTasks}/>
      <ListTask tasks = {tasks} setTasks = {setTasks}/>
    </div>
  )
}

export default Task

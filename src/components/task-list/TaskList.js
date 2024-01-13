// import React from 'react'
import Task from '../task/Task'

import './TaskList.css'

function TaskList({ todos, onDeleted, onEditTask, onDoneTask }) {
  const els = todos.map((el) => {
    const { id, ...elProps } = el
    return (
      <Task
        key={id}
        elProps={elProps}
        onDeleted={() => onDeleted(id)}
        onEditTask={(value) => onEditTask(id, value)}
        onDoneTask={(condition) => onDoneTask(id, condition)}
      />
    )
  })

  return <ul className="todo-list">{els}</ul>
}

export default TaskList

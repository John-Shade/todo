import { useState, useEffect, useRef } from 'react'
import './App.css'

import Footer from './components/footer'
import NewTaskInput from './components/new-task-input'
import TaskList from './components/task-list'

function TodoApp() {
  const data = [
    { id: 1, label: 'Task 1', done: false, date: new Date(), time: 220, play: false, dateStop: null },
    {
      id: 2,
      label: 'Task 2',
      done: true,
      date: new Date('August 13, 2024 14:15:30'),
      time: 240,
      play: false,
      dateStop: null,
    },
    {
      id: 3,
      label: 'Task 3',
      done: false,
      date: new Date('August 24, 2022 14:15:30'),
      time: 3,
      play: false,
      dateStop: null,
    },
  ]

  const [dataState, setDataState] = useState(data)
  const [filterData, setFilterData] = useState(dataState)
  const [prevFilter, setPrevFilter] = useState()
  const dataRef = useRef()

  const deleteTask = (id) => {
    setDataState((dataS) => {
      const arr = dataS.filter((el) => el.id !== id)
      return arr
    })
  }

  const addTask = (value) => {
    const task = {
      id: dataState.length > 0 ? dataState.slice(dataState.length - 1, dataState.length)[0].id + 1 : 1,
      label: value.text,
      time: value.time,
      done: false,
      date: new Date(),
      play: false,
      dateStop: null,
    }
    setDataState(dataState.concat(task))
  }

  const editTask = (id, value) => {
    const edTask = {
      id,
      label: value,
      done: false,
      date: new Date(),
    }
    const ind = dataState.findIndex((el) => el.id === id)
    const newArray = dataState.toSpliced(ind, 1, edTask)
    setDataState(newArray)
  }

  const doneTask = (id, condition) => {
    const task = dataState.find((el) => el.id === id)
    const ind = dataState.findIndex((el) => el.id === id)
    task.done = condition
    task.play = false
    const newArray = dataState.toSpliced(ind, 1, task)
    setDataState(newArray)
  }

  const clearComplited = () => {
    const newArray = dataState.filter((el) => !el.done)
    setDataState(newArray)
  }

  const filter = (e = prevFilter) => {
    switch (e.target.textContent) {
      case 'Completed': {
        const newArray = dataState.filter((el) => el.done === true)
        console.log('Completed')
        setFilterData(newArray)
        break
      }
      case 'Active': {
        const newArray = dataState.filter((el) => el.done === false)
        console.log('Active')
        setFilterData(newArray)
        break
      }
      default: {
        console.log('default')
        setFilterData(dataState)
      }
    }
    setPrevFilter(e)
  }

  useEffect(() => {
    if (prevFilter) {
      filter()
    } else {
      setFilterData(dataState)
    }
    dataRef.current = dataState
  }, [dataState])

  const timer = (id, play, time = undefined) => {
    if (dataRef.current.length === dataState.length) {
      const task = dataState.find((el) => el.id === id)
      const ind = dataState.findIndex((el) => el.id === id)
      task.time = time
      task.play = play
      task.dateStop = Date.now()
      const newArray = dataState.toSpliced(ind, 1, task)
      setDataState(newArray)
    }
  }

  return (
    <div className="todoapp">
      <h1>todos</h1>
      <NewTaskInput onAdd={addTask} />
      <TaskList
        todos={filterData}
        onDeleted={deleteTask}
        onEditTask={editTask}
        onDoneTask={doneTask}
        onChangeTimer={timer}
      />
      <Footer todos={dataState} onClearComplited={clearComplited} onFilter={filter} />
    </div>
  )
}

export default TodoApp

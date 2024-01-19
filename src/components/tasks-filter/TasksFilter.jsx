import { useState, useEffect } from 'react'
import './TasksFilter.css'

function TasksFilter({ onFilter }) {
  let el
  const [filterState, setFilterState] = useState()
  useEffect(() => {
    el = document.getElementById('All')
    setFilterState(el)
  }, [])

  function changeClassName(e) {
    const prev = filterState.target ? filterState.target : filterState
    if (e.target.textContent !== prev.textContent) {
      e.target.className = 'selected'
      prev.className = ''
    }
    setFilterState(e)
  }

  const classname = ['All', 'Active', 'Completed']

  return (
    <ul className="filters">
      {classname.map((item, index) => (
        <li key={item}>
          <button
            type="button"
            id={index === 0 ? 'All' : ''}
            className={index === 0 ? 'selected' : ''}
            onClick={(e) => {
              onFilter(e)
              changeClassName(e)
            }}
          >
            {item}
          </button>
        </li>
      ))}
    </ul>
  )
}

export default TasksFilter

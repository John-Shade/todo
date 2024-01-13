// import React from 'react'
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

  return (
    <ul className="filters">
      <li>
        <button
          type="button"
          id="All"
          className="selected"
          onClick={(e) => {
            onFilter(e)
            changeClassName(e)
          }}
        >
          All
        </button>
      </li>
      <li>
        <button
          type="button"
          onClick={(e) => {
            onFilter(e)
            changeClassName(e)
          }}
        >
          Active
        </button>
      </li>
      <li>
        <button
          type="button"
          onClick={(e) => {
            onFilter(e)
            changeClassName(e)
          }}
        >
          Completed
        </button>
      </li>
    </ul>
  )
}

export default TasksFilter

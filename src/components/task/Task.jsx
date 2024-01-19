import './Task.css'
import { useState } from 'react'
import { formatDistanceToNow } from 'date-fns'

function Task({ elProps, onDeleted, onEditTask, onDoneTask }) {
  const [buttonStateEdit, setButtonStateEdit] = useState(false)
  const { label, done, date, id } = elProps
  function className() {
    let classN = ''
    if (done) classN += ' completed'
    else if (buttonStateEdit) classN += ' editing'
    return classN
  }

  function EditTask(e) {
    if (e.key === 'Enter') {
      if (!e.target.value.split('').every((el) => el === ' ')) {
        onEditTask(e.target.value)
        setButtonStateEdit((state) => !state)
      }
    }
    if (e.key === 'Escape') {
      setButtonStateEdit((state) => !state)
    }
  }

  return (
    <li className={className()}>
      {!buttonStateEdit && (
        <div className="view">
          <input className="toggle" type="checkbox" id={id} onChange={() => onDoneTask(!done)} checked={done} />
          <label htmlFor={id}>
            <span className="description">{label}</span>
            <span className="created">created {formatDistanceToNow(date)}</span>
          </label>
          <button
            type="button"
            className="icon icon-edit tooltip"
            aria-label="Редактировать"
            onClick={() => setButtonStateEdit(!done ? !buttonStateEdit : buttonStateEdit)}
          >
            {done && <span className="tooltiptext">Задание уже выполнено</span>}
          </button>
          <button type="button" className="icon icon-destroy" aria-label="Удалить" onClick={onDeleted} />
        </div>
      )}
      {buttonStateEdit && <input type="text" className="edit" defaultValue={label} onKeyUp={EditTask} />}
    </li>
  )
}

export default Task

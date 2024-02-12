import './Task.css'
import { useEffect, useState, useRef } from 'react'
// import { useState } from 'react'
// import { useState } from 'react'
import { formatDistanceToNow } from 'date-fns'

function Task({ elProps, onDeleted, onEditTask, onDoneTask, onChangeTimer }) {
  const { label, done, date, id, time, play, dateStop } = elProps
  const [buttonStateEdit, setButtonStateEdit] = useState(false)
  const calculateTime =
    time - Math.ceil((Date.now() - dateStop) / 1000) >= 0 ? time - Math.ceil((Date.now() - dateStop) / 1000) : 0
  // const [timeState, setTimeState] = useState(play ? time - Math.ceil((Date.now() - dateStop) / 1000) : time)
  const [timeState, setTimeState] = useState(play ? calculateTime : time)
  const timerRef = useRef()
  const timeRef = useRef(time)
  const playRef = useRef(play)
  const deleteRef = useRef(false)
  const [playNowState, setPlayNowState] = useState(false)

  function className() {
    let classN = ''
    if (done) classN += ' completed'
    else if (buttonStateEdit) classN += ' editing'
    return classN
  }

  const stopTime = () => {
    clearTimeout(timerRef.current)
    playRef.current = false
    timerRef.current = undefined
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

  useEffect(() => {
    if (playRef.current === true && done === false && timeRef.current > 0) {
      timerRef.current = setTimeout(() => {
        setTimeState((t) => {
          if (t >= 1) {
            timeRef.current = t - 1
            return t - 1
          }
          timeRef.current = 0
          return 0
        })
      }, 1000)
    } else {
      stopTime()
    }
  }, [timeState, playNowState])

  useEffect(
    () => () => {
      if (!deleteRef.current) {
        onChangeTimer(timeRef.current, playRef.current)
      }
    },
    []
  )
  const playTime = () => {
    if (playRef.current !== true) {
      playRef.current = true
      setPlayNowState((p) => !p)
    }
  }

  return (
    <li className={className()}>
      {!buttonStateEdit && (
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            id={id}
            onChange={() => {
              stopTime()
              onDoneTask(!done)
            }}
            checked={done}
          />
          <label htmlFor={id}>
            <span className="description">{label}</span>
            <span className="created">
              <button
                type="button"
                className="icon icon-play tooltip tooltip-start"
                label
                htmlFor=""
                onClick={playTime}
              >
                {done && <span className="tooltiptext tooltiptext-start">Задание уже выполнено</span>}
              </button>
              <button
                type="button"
                className="icon icon-pause"
                label
                htmlFor={id}
                onClick={() => {
                  stopTime()
                }}
              />
              <span className="time">
                {(timeState - (timeState % 60)) / 60} : {timeState % 60 < 10 ? `0${timeState % 60}` : timeState % 60}
              </span>
            </span>
            <span className="created">created {formatDistanceToNow(date)}</span>
          </label>
          <button
            type="button"
            className="icon icon-edit tooltip tooltip-edit"
            aria-label="Редактировать"
            onClick={() => setButtonStateEdit(!done ? !buttonStateEdit : buttonStateEdit)}
          >
            {done && <span className="tooltiptext tooltiptext-edit">Задание уже выполнено</span>}
          </button>
          <button
            type="button"
            className="icon icon-destroy"
            aria-label="Удалить"
            onClick={() => {
              deleteRef.current = true
              onDeleted()
            }}
          />
        </div>
      )}
      {buttonStateEdit && <input type="text" className="edit" defaultValue={label} onKeyUp={EditTask} />}
    </li>
  )
}

export default Task

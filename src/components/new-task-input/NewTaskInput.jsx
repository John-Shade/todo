import './NewTaskInput.css'

function NewTaskForm({ onAdd }) {
  // const addTask = (e) => {
  //   console.log(e)
  //   if (e.key === 'Enter') {
  //     if (!e.target.value.split('').every((el) => el === ' ')) {
  //       onAdd(e.target.value)
  //       e.target.value = ''
  //     }
  //   }
  // }

  const addTask = (e) => {
    e.preventDefault()
    const time = Number(Number(e.target.newTodoFormTimerMin.value) * 60 + Number(e.target.newTodoFormTimerSec.value))
    const data = {
      text: e.target.newTodo.value,
      time,
    }
    onAdd(data)
  }

  return (
    <header className="header">
      <form className="new-todo-form" onSubmit={addTask}>
        <button type="submit" label />
        {/* <input type="text" className="new-todo" placeholder="What needs to be done?" onKeyUp={addTask} /> */}
        <input type="text" className="new-todo" name="newTodo" placeholder="What needs to be done?" />
        <input type="number" className="new-todo-form__timer" name="newTodoFormTimerMin" placeholder="Min" />
        <input type="number" className="new-todo-form__timer" name="newTodoFormTimerSec" placeholder="Sec" />
      </form>
    </header>
  )
}

export default NewTaskForm

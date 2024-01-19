import './NewTaskInput.css'

function NewTaskForm({ onAdd }) {
  const addTask = (e) => {
    if (e.key === 'Enter') {
      if (!e.target.value.split('').every((el) => el === ' ')) {
        onAdd(e.target.value)
        e.target.value = ''
      }
    }
  }

  return (
    <header className="header">
      <input type="text" className="new-todo" placeholder="What needs to be done?" onKeyUp={addTask} />
    </header>
  )
}

export default NewTaskForm

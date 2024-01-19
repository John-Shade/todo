import TasksFilter from '../tasks-filter/TasksFilter'
import './Footer.css'

function Footer({ todos, onClearComplited, onFilter }) {
  return (
    <footer className="footer">
      <span className="todo-count">{todos.filter((el) => !el.done).length} items left</span>
      <TasksFilter
        onFilter={(e) => {
          onFilter(e)
        }}
      />
      <button type="button" className="clear-completed" onClick={onClearComplited}>
        Clear completed
      </button>
    </footer>
  )
}

export default Footer

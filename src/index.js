import { createRoot } from 'react-dom/client'

import TodoApp from './App'

const id = document.getElementById('root')
const root = createRoot(id)
root.render(<TodoApp />)

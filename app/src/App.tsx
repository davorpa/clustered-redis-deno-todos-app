import { useState } from 'react'
import Todos from './components/Todos'
import { type TodoId, type TodosSlice } from './types'

const mockedTodos = [{
  id: '1',
  title: 'Learn React',
  done: false,
  createdAt: new Date(),
  updatedAt: new Date()
}, {
  id: '2',
  title: 'Learn TypeScript',
  done: true,
  createdAt: new Date(),
  updatedAt: new Date()
}]

function App(): JSX.Element {
  const [todos, setTodos] = useState<TodosSlice>(mockedTodos)

  const handleRemove = (id: TodoId): void => {
    setTodos(todos => todos.filter((item) => item.id !== id))
  }

  return (
    <div className="todoapp">
      <Todos
        datalist={todos}
        onRemove={handleRemove}
      />
    </div>
  )
}

export default App

import { useState } from 'react'
import Footer from './components/Footer'
import Todos from './components/Todos'
import { FiltersEnumValues } from './constants'
import { type TodoId, type TodosSlice, type FiltersEnum } from './types'

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
  const [selectedFilter, setSelectedFilter] = useState<FiltersEnum>(
    FiltersEnumValues.ALL)

  const handleRemove = (id: TodoId): void => {
    setTodos(todos => todos.filter((item) => item.id !== id))
  }

  const handleCompleted = (id: TodoId): void => {
    setTodos(todos => todos.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          done: !item.done,
          updatedAt: new Date()
        }
      }
      return item
    }))
  }

  const handleFilterChange = (filter: FiltersEnum): void => {
    setSelectedFilter(filter)
  }

  const handleClearCompleted = (): void => {
    setTodos(todos => todos.filter((item) => !item.done))
  }

  const activeCount = todos.filter((item) => !item.done).length
  const completedCount = todos.length - activeCount

  const filteredTodos = todos.filter((item) => {
    if (selectedFilter === FiltersEnumValues.ACTIVE) return !item.done
    if (selectedFilter === FiltersEnumValues.COMPLETED) return item.done
    return true
  })

  return (
    <div className="todoapp">
      <Todos
        datalist={filteredTodos}
        onRemove={handleRemove}
        onToggleCompleted={handleCompleted}
        />
      <Footer
        activeCount={activeCount}
        completedCount={completedCount}
        selectedFilter={selectedFilter}
        onFilterChange={handleFilterChange}
        onClearCompleted={handleClearCompleted}
        />
    </div>
  )
}

export default App

import { useState } from 'react'
import Todos from './components/Todos'
import { type TodosSlice } from './types'

function App(): JSX.Element {
  const [todos] = useState<TodosSlice>([])

  return (
    <Todos datalist={todos} />
  )
}

export default App

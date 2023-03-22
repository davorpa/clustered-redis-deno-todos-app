import clsx from 'clsx'
import { type TodoId, type TodosSlice } from '../types'
import Todo from './Todo'

interface Props {
  datalist: TodosSlice
  onRemove: (id: TodoId) => void
}

const Todos: React.FC<Props> = ({ datalist, onRemove }) => {
  return (
    <ul className="todo-list">
      {datalist.map((item) => (
        <li key={item.id} className={clsx({ completed: item.done })}>
          <Todo
            data={item}
            onRemove={onRemove}
            />
        </li>
      ))}
    </ul>
  )
}

export default Todos

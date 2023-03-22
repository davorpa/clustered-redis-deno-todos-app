import clsx from 'clsx'
import { type TodosSlice } from '../types'

interface Props {
  datalist: TodosSlice
}

const Todos: React.FC<Props> = ({ datalist }) => {
  return (
    <ul>
      {datalist.map((item) => (
        <li key={item.id} className={clsx({ completed: item.done })}>
          {item.title}
        </li>
      ))}
    </ul>
  )
}

export default Todos

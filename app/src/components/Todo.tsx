import { useId } from 'react'
import { type TodoId, type Todo as TodoType } from '../types'

interface Props {
  data: TodoType
  onRemove: (id: TodoId) => void
}

const Todo: React.FC<Props> = ({ data, onRemove }) => {
  const { id, title, done, createdAt, updatedAt } = data
  const inputId = useId()

  const handleCompletedChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    console.log(event.target.checked)
  }

  const handleDestroyClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    onRemove(id)
  }

  return (
    <div
        className="view"
        data-id={id}
        data-created-at={createdAt.toISOString()}
        data-updated-at={updatedAt.toISOString()}>
      <input
        type="checkbox"
        id={inputId}
        name="completed"
        className="toggle"
        defaultChecked={done}
        onChange={handleCompletedChange} />
      <label htmlFor={inputId}>{title}</label>
      <button className="destroy" onClick={handleDestroyClick}/>
    </div>
  )
}

export default Todo

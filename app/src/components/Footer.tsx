import React from 'react'
import { type FiltersEnum } from '../types'
import Filters from './Filters'

interface Props {
  activeCount: number
  completedCount: number
  selectedFilter: FiltersEnum
  onFilterChange: (filter: FiltersEnum) => void
  onClearCompleted: () => void
}

const Footer: React.FC<Props> = ({
  activeCount = 0,
  completedCount = 0,
  selectedFilter,
  onFilterChange,
  onClearCompleted
}) => {
  const handleClearCompletedClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    onClearCompleted()
  }

  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{activeCount}</strong> pending {activeCount === 1 ? 'task' : 'tasks'}
      </span>

      <Filters
        selectedValue={selectedFilter}
        onSelectionChange={onFilterChange}
        />

      {completedCount > 0 && (
        <button className="clear-completed" onClick={handleClearCompletedClick}>
          Clear completed
        </button>
      )}
    </footer>
  )
}

export default Footer

import Filters, { type FiltersEnum } from './Filters'

interface Props {
  activeCount: number
  completedCount: number
  selectedFilter: FiltersEnum
  onFilterChange: (filter: FiltersEnum) => void
}

const Footer: React.FC<Props> = ({
  activeCount = 0,
  completedCount = 0,
  selectedFilter,
  onFilterChange
}) => {
  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{activeCount}</strong> pending {activeCount === 1 ? 'task' : 'tasks'}
      </span>

      <Filters
        selectedValue={selectedFilter}
        onSelectionChange={onFilterChange}
        />
    </footer>
  )
}

export default Footer

import clsx from 'clsx'
import { FiltersEnumValues } from '../constants'
import { type FiltersEnum } from '../types'

const FiltersButtons = {
  [FiltersEnumValues.ALL]: {
    literal: 'All',
    href: `/?filter=${encodeURIComponent(FiltersEnumValues.ALL)}`
  },
  [FiltersEnumValues.ACTIVE]: {
    literal: 'Active',
    href: `/?filter=${encodeURIComponent(FiltersEnumValues.ACTIVE)}`
  },
  [FiltersEnumValues.COMPLETED]: {
    literal: 'Completed',
    href: `/?filter=${encodeURIComponent(FiltersEnumValues.COMPLETED)}`
  }
} as const

interface Props {
  selectedValue: FiltersEnum
  onSelectionChange: (value: FiltersEnum) => void
}

const Filters: React.FC<Props> = ({
  selectedValue,
  onSelectionChange
}) => {
  return (
    <ul className="filters">
      {Object.entries(FiltersButtons).map(([value, { literal, href }]) => (
        <li key={value}>
          <a
            href={href}
            className={clsx({ selected: value === selectedValue })}
            onClick={(event) => {
              event.preventDefault()
              onSelectionChange(value as FiltersEnum)
            }}>
            {literal}
          </a>
        </li>
      ))}
    </ul>
  )
}

export default Filters

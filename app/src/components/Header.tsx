import { useState } from "react"

interface Props {
  onCreate: (title: string) => void
}

const Header: React.FC<Props> = ({ onCreate }) => {
  const [formData, setFormData] = useState<Record<string, any>>({
    title: ''
  })

  const handleFormInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setFormData((formData) => ({
      ...formData,
      [event.target.name]: event.target.value
    }))
  }

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    onCreate(formData.title)
    setFormData({
      title: ''
    })
  }

  return (
    <header className="header">
      <h1>
        todo
        <span style={{
          display: 'inline-block',
          background: '#2d79c7',
          color: '#ffffff',
          textTransform: 'uppercase',
          verticalAlign: 'baseline',
          fontSize: '0.45em',
          padding: '1em 0.25em 0.3em 0.5em',
          borderRadius: '0.2em',
          fontWeight: 'bold'
        }}>
          TS
        </span>
      </h1>

      <form onSubmit={handleFormSubmit}>
        <input
          className="new-todo"
          name="title"
          value={formData.title}
          onChange={handleFormInputChange}
          placeholder="What do you need to do?"
          autoFocus
          />
      </form>
    </header>
  )
}

export default Header

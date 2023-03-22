type TodoId = string
type TodoTitle = string
type TodoDescription = string
type TodoCompleted = boolean
type TodoCreatedAt = Date
type TodoUpdatedAt = Date

export interface Todo {
  id: TodoId
  title: TodoTitle
  description?: TodoDescription
  done: TodoCompleted
  createdAt: TodoCreatedAt
  updatedAt: TodoUpdatedAt
}

export type TodosSlice = Todo[]

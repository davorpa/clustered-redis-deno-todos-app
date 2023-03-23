export type TodoId = string
export type BoolAlike = boolean
export type DateAlike = Date

export interface Todo {
  id: TodoId
  title: string
  description?: string
  done: BoolAlike
  createdAt: DateAlike
  updatedAt: DateAlike
}

export type TodosSlice = Todo[]

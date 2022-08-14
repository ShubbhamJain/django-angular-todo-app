export interface ToDo {
  id: number
  taskName: string
  taskDescription?: string
  completed: boolean
  created: string
  updated: string
}

export interface User {
  id: number
  username: string
  email: string
}

export interface editToDo {
  id: number
  taskName?: string
  taskDescription?: string
}

export interface ToDosBackendRes {
  success: boolean
  errors: any
  status: number
  data: Array<ToDo>
}

export interface AddToDosBackendRes {
  success: boolean
  errors: any
  status: number
  data: ToDo
}

export interface authBackendRes {
  success: boolean
  errors: any
  status: number
  user: User
  token: string
}

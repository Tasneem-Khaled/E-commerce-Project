export interface Successfulsignup {
  message: string
  user: UserInterface
  token: string
}

export interface UserInterface {
  id: string
  name: string
  email: string
  role: string
}

export interface Failedsignup {
  statusMsg: string
  message: string
}

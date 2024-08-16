export interface User {
  username: string
  id: string
}

export type UserContext = {
  user: User | null
  login: (username: string, password: string) => Promise<void>
  logout: () => void
}

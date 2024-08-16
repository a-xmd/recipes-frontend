import { useOutletContext } from 'react-router-dom'
import { UserContext } from '@/types/user.ts'

// @note: hideout
// https://reactrouter.com/en/main/hooks/use-outlet-context

export function useUser() {
  return useOutletContext<UserContext>()
}

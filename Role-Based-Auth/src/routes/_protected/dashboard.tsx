import { createFileRoute } from '@tanstack/react-router'
import { useAuth } from '../../context/useAuth'

export const Route = createFileRoute('/_protected/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  const {user} = useAuth();
  console.log(user);
  return <div>Hello "/_protected/dashboard"!</div>
}

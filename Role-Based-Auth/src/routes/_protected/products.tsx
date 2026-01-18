import { createFileRoute } from '@tanstack/react-router'
import ProtectedRoutes from '../../components/ProtectedRoutes';
import { PERMISSIONS } from '../../utils/roles';

export const Route = createFileRoute('/_protected/products')({
  component: () => {
    <ProtectedRoutes permissions={[PERMISSIONS.VIEW_PRODUCTS]}>
      <RouteComponent />
    </ProtectedRoutes>;
  }
})

function RouteComponent() {
  return <div>Hello "/_protected/products"!</div>
}

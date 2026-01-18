import { createFileRoute, useNavigate } from "@tanstack/react-router";
import ProtectedRoutes from "../../components/ProtectedRoutes";
import { PERMISSIONS } from "../../utils/roles";
import { deleteProducts, getProducts, type Product } from "../../api";
import { useAuth } from "../../context/useAuth";

export const Route = createFileRoute("/_protected/products")({
  component: () => (
    <ProtectedRoutes permissions={[PERMISSIONS.VIEW_PRODUCTS]}>
      <RouteComponent />
    </ProtectedRoutes>
  ),
  loader: async () => {
    return await getProducts();
  },
});

function RouteComponent() {
  const products = Route.useLoaderData();
  const { hasPermission } = useAuth();
  const navigate = useNavigate();
  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    if (!hasPermission(PERMISSIONS.DELETE_PRODUCT)) {
      navigate({ to: "/unauthorized" });
      return;
    }

    if (window.confirm("Are you sure to delete this product?")) {
      await deleteProducts(id);
      products?.filter((product) => product.id !== id);
    }
  };
  console.log(products);
  return (
    <div className="p-10">
      <h2 className="text-4xl font-bold mb-2">Products</h2>
      <p className="text-gray-800">Here is the Products list:</p>
      <ul>
        {products?.map((product: Product) => (
          <li
            key={product.id}
            className="text-gray-600 border border-gray-300 p-2 md:w-1/3"
          >
            {product.name} - ${product.price}
            {hasPermission(PERMISSIONS.EDIT_PRODUCT) && (
              <button
                type="button"
                onClick={() => alert(`Edit: ${product.name}`)}
                className="bg-blue-500 rounded-full px-5 py-1.5 text-white mr-3 ml-3"
              >
                EDIT
              </button>
            )}
            {hasPermission(PERMISSIONS.DELETE_PRODUCT) && (
              <button
                type="button"
                onClick={(e) => handleDelete(product.id, e)}
                className="bg-red-600 rounded-full px-5 py-1.5 text-white"
              >
                DELETE
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { useAuth } from "../../context/useAuth";

export const Route = createFileRoute("/_protected/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  const { user } = useAuth();
  console.log(user);
  return (
    <div className="p-10">
      <h2 className="text-4xl font-bold mb-2">Welcome, {user?.username}</h2>
      <p className="text-gray-800">Role: {user?.role}</p>
    </div>
  );
}

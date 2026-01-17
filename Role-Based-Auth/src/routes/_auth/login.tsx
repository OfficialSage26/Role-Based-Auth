import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { login } from "../../api";
import { useAuth } from "../../context/useAuth";

export const Route = createFileRoute("/_auth/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const {login: authLogin} = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    if (!username) return alert ("Invalid Credentials");
    const user = await login(username, password);

    if (user){
      authLogin(user);
      navigate({to:"/dashboard"});
    } else {
      alert("Invalid Credentials");
      setUsername("");
      setPassword("");
    }
  };
  return (
    <div className="flex flex-col items-center p-10">
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <div className="md: flex md:items-center mb-6">
          <label className="md:w-1/3 block text-gray-700 font-bold">
            Username
          </label>
          <input
            className="md:w-2/3 border-blue-500 rounded-xl w-full py-2 px-3"
            type="text"
            value={username}
            placeholder="Enter username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="md: flex md:items-center mb-6">
          <label className="md:w-1/3 block text-gray-700 font-bold">
            Password
          </label>
          <input
            className="md:w-2/3 border-blue-500 rounded-xl w-full py-2 px-3"
            type="text"
            value={password}
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="md:flex md:justify-end">
          <button
            type="submit"
            className="bg-blue-400 border rounded text-white p-2 px-3 md:w-2/3"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

import { Navigate } from "@tanstack/react-router";
import { useAuth } from "../context/useAuth";

const ProtectedRoutes = ({
    children,
    permissions,
    allowGuest = false,
}: {
    children: React.ReactNode;
    permissions?: string[];
    allowGuest?: boolean 
}) => {
    const { user, hasPermission } = useAuth();
    console.log("User:", user, "Allow Guest", allowGuest);

    //allow guest if allowGuest is true
    if (allowGuest && !user){
        return children;
    }

    //redirect to login if the user is not authenticated
    if (!user){
        return <Navigate to="/login" />;
    }

    //redirect to unauthorized if the user lacks required permission
    if (permissions && !permissions.every((p) => hasPermission(p))){
        return <Navigate to="/unauthorized" />;
    }

    //render the children if the user is authenticated and has permission
    return children;
    
};

export default ProtectedRoutes;
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../shared/hooks/useAuth";
import Loader from "../shared/common/Loader";

const ProtectedRoute = () => {
    const {isAuthenticated, isLoading} = useAuth();

    if(isLoading) {
        return <Loader />;
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;

}

export default ProtectedRoute;
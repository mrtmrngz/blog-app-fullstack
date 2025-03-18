import {Navigate, Outlet} from "react-router";
import {useAuth} from "../context/AuthContext.tsx";
import Loader from "../components/UI/Loader.tsx";

const AdminRoutes = () => {

    const { user, loading, authCheckComplete } = useAuth()

    if(loading || !authCheckComplete) {
        return <Loader />
    }

    if(user?.role !== "admin") {
        return <Navigate to="/" replace />
    }

    return <Outlet />
};

export default AdminRoutes;
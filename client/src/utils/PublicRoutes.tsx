import {Navigate, Outlet} from "react-router";
import {useAuth} from "../context/AuthContext.tsx";
import Loader from "../components/UI/Loader.tsx";

const PublicRoutes = () => {

    const {user, loading, authCheckComplete} = useAuth()

    if(loading || !authCheckComplete) {
        return <Loader />
    }

    if(!user) {
        return <Navigate to="/auth/login" replace />
    }

    return <Outlet />
};

export default PublicRoutes;
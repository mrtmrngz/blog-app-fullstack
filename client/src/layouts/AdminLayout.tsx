import {Outlet, useLocation} from "react-router";
import AdminLinks from "../components/Admin/AdminLinks/AdminLinks.tsx";
import AdminHeader from "../components/Admin/Header/AdminHeader.tsx";
import {useEffect, useState} from "react";

const AdminLayout = () => {

    const [isNavOpen, setIsNavOpen] = useState<boolean>(false)
    const {pathname} = useLocation()

    useEffect(() => {
        setIsNavOpen(false)
    }, [pathname])

    return (
        <div className="admin-layout">
            <AdminLinks setIsNavOpen={setIsNavOpen} isNavOpen={isNavOpen} />
            <div className="admin-main-wrapper">
                <AdminHeader setIsNavOpen={setIsNavOpen} />
                <main className="admin-main">
                    <Outlet/>
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
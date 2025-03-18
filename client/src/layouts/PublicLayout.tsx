import Header from "../components/Header/Header.tsx";
import {Outlet, useLocation} from "react-router";
import Footer from "../components/Footer/Footer.tsx";

const PublicLayout = () => {

    const location = useLocation()
    const isNoMargin = location.pathname.startsWith('/profile/')

    return (
        <>
            <Header />
            <main className={`public-main ${isNoMargin ? "no-margin" : ""}`}>
                <Outlet />
            </main>
            <Footer />
        </>
    );
};

export default PublicLayout;
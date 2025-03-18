import {Link, useLocation} from "react-router";
import Button from "../UI/Button.tsx";
import {useAuth} from "../../context/AuthContext.tsx";
import {toast} from "react-toastify";
import apiRequest from "../../libs/apiRequest.ts";

const HeaderLinks = () => {

    const {pathname} = useLocation()
    const {user} = useAuth()

    const handleLogout = async () => {
        try {
            const response = await apiRequest.post('/auth/logout')

            if(response?.status === 200) {
                toast.warning(response?.data?.message)
                window.location.href = "/auth/login"
            }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        }catch (err) {
            toast.error("Something goes wrong!")
        }
    }

    return (
        <nav>
            <ul className="header-links">
                <li className={`header-link ${pathname === "/" ? "active" : ""}`}>
                    <Link to="/">Home</Link>
                </li>
                <li className={`header-link ${pathname === "/blogs" ? "active" : ""}`}>
                    <Link to="/blogs">Blogs</Link>
                </li>
                {user ? (
                    <>
                        <li className={`header-link ${pathname === `/profile/${user?.username}` ? "active" : ""}`}>
                            <Link to={`/profile/${user.username}`}>Profile</Link>
                        </li>
                        <li className={`header-link ${pathname === "/new-blog" ? "active" : ""}`}>
                            <Link to="/new-blog">Add Blog</Link>
                        </li>
                        {user.role === "admin" && (
                            <li className={`header-link`}>
                                <Link to="/admin">Admin</Link>
                            </li>
                        )}
                        <li className="header-link">
                            <Button onClick={handleLogout} className="logout-button" size="sm" type="danger">Logout</Button>
                        </li>
                    </>
                ) : (
                    <>
                        <li className="header-link">
                            <Link to="/auth/register">Register</Link>
                        </li>
                        <li className="header-link">
                            <Link className="login-link" to="/auth/login">Login</Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default HeaderLinks;
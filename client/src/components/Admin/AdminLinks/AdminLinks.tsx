import {Link, useLocation} from "react-router";
import { FaHome } from "react-icons/fa";
import { RiDashboardHorizontalFill } from "react-icons/ri";
import { MdCategory } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { CiBoxList } from "react-icons/ci";
import { FiUsers } from "react-icons/fi";
import './AdminLinks.scss'
import { FaTimes } from "react-icons/fa";

interface AdminLinksProps {
    setIsNavOpen: (b: boolean) => void
    isNavOpen: boolean
}

const AdminLinks = ({setIsNavOpen, isNavOpen}: AdminLinksProps) => {

    const {pathname} = useLocation()

    return (
        <>
            <aside className="admin-links">
                <div className="admin-links-wrapper">
                    <nav>
                        <ul className="admin-links-list">
                            <li className="main-link-item">
                                <span className="link-header">Dashboard</span>
                                <ul className="child-links">
                                    <li className="child-link-item">
                                        <Link className={pathname === "/admin/dashboard" ? "active" : ""} to="/admin/dashboard">
                                            <RiDashboardHorizontalFill size={16} />
                                            Dashboard
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="main-link-item">
                                <span className="link-header">Category</span>
                                <ul className="child-links">
                                    <li className="child-link-item">
                                        <Link className={pathname === "/admin/categories" ? "active" : ""} to="/admin/categories">
                                            <MdCategory size={16} />
                                            Category List
                                        </Link>
                                    </li>
                                    <li className="child-link-item">
                                        <Link className={pathname === "/admin/categories/new-category" ? "active" : ""} to="/admin/categories/new-category">
                                            <IoMdAdd size={16} />
                                            Add Category
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="main-link-item">
                                <span className="link-header">Blog</span>
                                <ul className="child-links">
                                    <li className="child-link-item">
                                        <Link className={pathname === "/admin/blogs" ? "active" : ""} to="/admin/blogs">
                                            <CiBoxList size={14} />
                                            Blog List
                                        </Link>
                                    </li>
                                    <li className="child-link-item">
                                        <Link className={pathname === "/admin/blogs/new-blog" ? "active" : ""} to="/admin/blogs/new-blog">
                                            <IoMdAdd size={16} />
                                            Add Blog
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="main-link-item">
                                <span className="link-header">Users</span>
                                <ul className="child-links">
                                    <li className="child-link-item">
                                        <Link className={pathname === "/admin/users" ? "active" : ""} to="/admin/users">
                                            <FiUsers size={14} />
                                            Users List
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="back-to-home-item">
                                <Link to="/" className="back-to-home-link">
                                    <FaHome size={16} />
                                    Back to Home
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </aside>
            <aside className={`admin-links-mobile ${isNavOpen ? "open" : ""}`}>
                <div className="admin-links-wrapper">
                    <nav>
                        <ul className="admin-links-list">
                            <li className="main-link-item">
                                <span className="link-header">Dashboard</span>
                                <ul className="child-links">
                                    <li className="child-link-item">
                                        <Link className={pathname === "/admin/dashboard" ? "active" : ""} to="/admin/dashboard">
                                            <RiDashboardHorizontalFill size={16} />
                                            Dashboard
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="main-link-item">
                                <span className="link-header">Category</span>
                                <ul className="child-links">
                                    <li className="child-link-item">
                                        <Link className={pathname === "/admin/categories" ? "active" : ""} to="/admin/categories">
                                            <MdCategory size={16} />
                                            Category List
                                        </Link>
                                    </li>
                                    <li className="child-link-item">
                                        <Link className={pathname === "/admin/categories/new-category" ? "active" : ""} to="/admin/categories/new-category">
                                            <IoMdAdd size={16} />
                                            Add Category
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="main-link-item">
                                <span className="link-header">Blog</span>
                                <ul className="child-links">
                                    <li className="child-link-item">
                                        <Link className={pathname === "/admin/blogs" ? "active" : ""} to="/admin/blogs">
                                            <CiBoxList size={14} />
                                            Blog List
                                        </Link>
                                    </li>
                                    <li className="child-link-item">
                                        <Link className={pathname === "/admin/blogs/new-blog" ? "active" : ""} to="/admin/blogs/new-blog">
                                            <IoMdAdd size={16} />
                                            Add Blog
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="main-link-item">
                                <span className="link-header">Users</span>
                                <ul className="child-links">
                                    <li className="child-link-item">
                                        <Link className={pathname === "/admin/users" ? "active" : ""} to="/admin/users">
                                            <FiUsers size={14} />
                                            Users List
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="back-to-home-item">
                                <button className="close-admin-links" onClick={() => setIsNavOpen(false)}>
                                    <FaTimes size={16} />
                                    Close Menu
                                </button>
                                <Link to="/" className="back-to-home-link">
                                    <FaHome size={16} />
                                    Back to Home
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </aside>
        </>
    );
};

export default AdminLinks;
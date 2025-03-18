import { FaBars } from "react-icons/fa6";
import './AdminHeader.scss'

const AdminHeader = ({setIsNavOpen}: {setIsNavOpen: (b: boolean) => void}) => {
    return (
        <header className="admin-header">
            <div className="admin-header-wrapper">
                <button className="admin-links-open-btn" onClick={() => setIsNavOpen(true)}>
                    <FaBars size={25} fill="#ffffff" />
                </button>
                <h1 className="admin-route-badge">
                    Hello Admin 👋👋
                </h1>
            </div>
        </header>
    );
};

export default AdminHeader;
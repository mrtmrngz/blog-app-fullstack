import {FaPlus} from "react-icons/fa";
import {Link} from "react-router";
import './TabMenu.scss'

interface TabMenuProps {
    selectedTab: "my-blogs" | "my-favorites"
    onSelectTab: (tabName: "my-blogs" | "my-favorites") => void
}

const TabMenu = ({selectedTab, onSelectTab}: TabMenuProps) => {
    return (
        <div className="tabs">
            <div className="tab-buttons-wrapper">
                <button className={`tab-button ${selectedTab === "my-blogs" ? "active" : ""}`} onClick={() => onSelectTab("my-blogs")}>My Blogs</button>
                <button className={`tab-button ${selectedTab === "my-favorites" ? "active" : ""}`} onClick={() => onSelectTab('my-favorites')}>My Favorites</button>
            </div>
            {selectedTab === 'my-blogs' && (
                <Link to="/new-blog" className="tab-menu-add-blog-btn">
                    <FaPlus size={16}/>
                    Add Blog
                </Link>
            )}
        </div>
    );
};

export default TabMenu;
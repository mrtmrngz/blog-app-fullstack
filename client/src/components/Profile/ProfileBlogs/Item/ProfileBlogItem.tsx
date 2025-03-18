import './ProfileBlogItem.scss'
import {Link, useNavigate} from "react-router";
import Image from "../../../UI/Image.tsx";
import {FaCalendarAlt, FaTrash, FaEdit, FaUser} from "react-icons/fa";
import {ProfileBlogTypes} from "../../../../types.ts";
import {formattedDate} from "../../../../utils/generateDate.ts";


interface ProfileBlogItemProps {
    setSelectedBlog: (id: string) => void;
    setIsAlertModalOpen?: (b: boolean) => void;
    setIsModalInvalid?: (b: boolean) => void;
    selectedTab: "my-blogs" | "my-favorites"
    blog: ProfileBlogTypes
}

const ProfileBlogItem = ({
                             setSelectedBlog,
                             setIsAlertModalOpen,
                             setIsModalInvalid,
                             selectedTab,
                             blog
                         }: ProfileBlogItemProps) => {

    const navigate = useNavigate()
    const isOwnBlog = selectedTab === "my-blogs"

    return (
        <Link to={`/blog/${blog?.slug}`} className="profile-blog-link">
            <div className="image-wrapper">
                <Image src={blog?.image} alt={blog?.title} height="250"/>
            </div>
            <div className="info">
                <div className="text-wrapper">
                    <h3 className="title">{blog?.title}</h3>
                    <p className="description">{blog?.description.substring(0, 50)}</p>
                </div>
                <div className="meta-info">
                    {!isOwnBlog && (
                        <div className="group">
                            <FaUser size={14}/>
                            <span>{blog?.author.firstName} {blog?.author.lastName}</span>
                        </div>
                    )}
                    <div className="group">
                        <FaCalendarAlt size={14}/>
                        <span>{formattedDate(blog?.createdAt)}</span>
                    </div>
                    {isOwnBlog && (
                        <>
                            <div onClick={(e) => {
                                e.stopPropagation()
                                e.preventDefault()
                                navigate(`/edit-blog/${blog?.slug}`)
                            }} className="group edit-group">
                                <button title="Edit Blog" className="edit-action action-btn">
                                    <FaEdit size={14}/>
                                </button>
                                <span>Edit Blog</span>
                            </div>
                            {setIsModalInvalid && setIsAlertModalOpen && (
                                <div onClick={(e) => {
                                    e.stopPropagation()
                                    e.preventDefault()
                                    setSelectedBlog(blog?.id)
                                    setIsModalInvalid(true)
                                    setIsAlertModalOpen(true)
                                }} className="group delete-group">
                                    <button title="Delete Blog" className="delete-action action-btn">
                                        <FaTrash size={14}/>
                                    </button>
                                    <span>Delete Blog</span>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </Link>
    );
};

export default ProfileBlogItem;
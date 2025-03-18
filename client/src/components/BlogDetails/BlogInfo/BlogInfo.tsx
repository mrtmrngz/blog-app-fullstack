import './BlogInfo.scss'
import Image from "../../UI/Image.tsx";
import {FaHeart, FaRegHeart} from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import {formattedDate} from "../../../utils/generateDate.ts";
import {useAuth} from "../../../context/AuthContext.tsx";
import {useNavigate} from "react-router";
import {useEffect, useState} from "react";
import {LikesType} from "../../../types.ts";
import {useDeleteBlogMutation, useLikeBlogMutation} from "../../../services/blogService.ts";
import {toast} from "react-toastify";
import {FetchBaseQueryError} from "@reduxjs/toolkit/query/react";

interface BlogInfoProps {
    id: string;
    category: string;
    title: string;
    description: string;
    image: string;
    author: {
        id: string;
        avatar: string;
        firstName: string;
        lastName: string;
        username: string;
    };
    createdAt: string;
    readerCount: number;
    likes: LikesType[]
}

const BlogInfo = ({category, title, description, image, author, createdAt, readerCount, id, likes}: BlogInfoProps) => {

    const {user} = useAuth()
    const [liked, setLiked] = useState<boolean>(false)
    const navigate = useNavigate()

    const [likeBlog, {isError: isLikeError, error: likeError}] = useLikeBlogMutation()
    const [deleteBlog, {isError: isDeleteError, error: deleteError}] = useDeleteBlogMutation()

    const handleLike = async () => {
        const result = await likeBlog({blogId: id}).unwrap()

        if(result) {
            toast.success(result.message)
            setLiked(result.isLiked)
        }
    }

    const handleDeleteBlog = async () => {
        const result = await deleteBlog({blogId: id}).unwrap()
        if(result) {
            toast.success(result.message)
            navigate("/")
        }
    }

    if(isLikeError) {
        if((likeError as FetchBaseQueryError).status === 404) {
            const errMessage = (likeError as { data?: { error?: string} })?.data?.error || "Something goes wrong"
            toast.error(errMessage)
        }
    }

    if(isDeleteError) {
        const fetchError = deleteError as FetchBaseQueryError;
        if(fetchError.status === 404 || fetchError.status === 401) {
            const errorMessage = (fetchError.data as { error?: string })?.error || "Somethings goes wrong"
            toast.error(errorMessage)
        }
    }

    useEffect(() => {
        if(user) {
            setLiked(likes.some((like: LikesType) => user.id === like.userId))
        }
    }, [user, likes]);

    return (
        <header className="blog-info-header">
            <div className="category-title-wrapper">
                <div className="category-wrapper">
                    <span>{category}</span>
                </div>
                <h1 className="blog-title">{title}</h1>
            </div>

            <div className="blog-info-hero">
                <p className="description">{description}</p>
                <div className="image-wrapper">
                    <Image src={image} alt={title} height="600" />
                </div>

                <div className="author-actions-wrapper">
                    <div className="author-info-wrapper">
                        <div onClick={() => navigate(`/profile/${author?.username}`)} className="avatar-wrapper">
                            <Image src={author?.avatar} alt={author.username} width="50" height="50" />
                        </div>
                        <div className="author-info">
                            <div onClick={() => navigate(`/profile/${author.username}`)} className="name">{author.firstName} {author.lastName}</div>

                            <div className="date_reader">
                                <span>{formattedDate(createdAt)}</span>
                                <span>{readerCount} Readed</span>
                            </div>
                        </div>
                    </div>

                    <div className="actions">
                        {user && (
                            <button onClick={handleLike} className={`single-action like-action ${liked ? "liked" : ""}`}>
                                {liked ? <FaHeart size={14} fill='red' /> : <FaRegHeart size={14} />}
                                <span>{liked ? "Unlike" : "Like"}</span>
                            </button>
                        )}
                        {(user && (user.id === author.id || user.role === "admin")) && (
                            <button onClick={handleDeleteBlog} className="single-action delete-action">
                                <FaRegTrashCan size={14} />
                                <span>Delete</span>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default BlogInfo;
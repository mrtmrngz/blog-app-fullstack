import Image from "../../UI/Image.tsx";
import {FaHeart, FaRegHeart} from "react-icons/fa";
import {Link, useLocation, useNavigate, useSearchParams} from "react-router";
import {FetchBlogInterface} from "../../../types.ts";
import {useEffect, useState} from "react";
import {useAuth} from "../../../context/AuthContext.tsx";
import {useLikeBlogMutation} from "../../../services/blogService.ts";
import {toast} from "react-toastify";
import {FetchBaseQueryError} from "@reduxjs/toolkit/query/react";
import './LikedReadedItem.scss'
import {format} from "timeago.js";

interface LikedReadedItemProps {
    blog: FetchBlogInterface
}

const LikedReadedItem = ({blog}: LikedReadedItemProps) => {

    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()
    const {pathname} = useLocation()
    const [liked, setLiked] = useState<boolean>(false)
    const {user} = useAuth()
    const [likeBlog, {isError: isLikeBlogError, error: likeBlogError}] = useLikeBlogMutation()

    const handleLike = async () => {
        const result = await likeBlog({blogId: blog?.id.toString()}).unwrap()

        if(result) {
            toast.success(result.message)
            setLiked(result.isLiked)
        }
    }

    if(isLikeBlogError) {
        const likeBlogErrorType = likeBlogError as FetchBaseQueryError
        if(likeBlogErrorType.status === 401 || likeBlogErrorType.status === 404) {
            const errMessage = (likeBlogErrorType?.data as {error?: string})?.error || "Something goes wrong"
            toast.error(errMessage)
        }
    }

    useEffect(() => {
        if(user) {
            setLiked(blog?.likes.some((like) => like.userId === user?.id))
        }
    }, [blog, user])

    const handleCategoryChange = (category: string) => {
        const params = new URLSearchParams(searchParams);

        if (category === "" || category === "all") {
            params.delete("cat");
        } else {
            if(pathname.startsWith('/blogs')) {
                params.set("cat", category);
            }else {
                navigate(`/blog/${blog?.slug}`)
            }
        }

        setSearchParams(params);
    };

    return (
        <Link to={`/blog/${blog?.slug}`} className="most-liked-item">
            <div className="image-wrapper">
                <Image src={blog?.image} alt={blog?.title}/>
            </div>
            <div className="blog-info">
                <div className="cat-fav">
                    <span onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        handleCategoryChange(blog?.category.slug)
                    }} className="blog-category">{blog?.category.title}</span>
                    {user && (
                        <button onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            handleLike()
                        }} className="add-fav-btn">
                            {liked ? <FaHeart size={22} fill='red' /> : <FaRegHeart size={22} />}
                        </button>
                    )}
                </div>
                <h2 className="title">{blog?.title}</h2>
                <p className="description">{`${blog?.description.substring(0, 120)}...`}</p>
                <div title="Show user blogs" className="author-info" onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    navigate(`/profile/${blog.author?.username}`)
                }}>
                    <div className="avatar">
                        <Image src={blog?.author.avatar} alt={blog?.author.username} height="45" width="45"/>
                    </div>
                    <div className="info">
                        <strong>{blog?.author?.firstName} {blog?.author?.lastName}</strong>
                        <span>{format(blog?.createdAt)}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default LikedReadedItem;
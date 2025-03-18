import {FeaturedBlogTypes} from "../../../types.ts";
import Image from "../../UI/Image.tsx";
import {FaRegHeart, FaHeart} from "react-icons/fa";
import {Link, useNavigate} from "react-router";
import {useLikeBlogMutation} from "../../../services/blogService.ts";
import {FetchBaseQueryError} from "@reduxjs/toolkit/query/react";
import {toast} from "react-toastify";
import {useAuth} from "../../../context/AuthContext.tsx";
import {useEffect, useState} from "react";

interface FeaturedBlogItemProps {
    blog: FeaturedBlogTypes
}

const FeaturedBlogItem = ({blog}: FeaturedBlogItemProps) => {

    const navigate = useNavigate()
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

    return (
        <Link to={`/blog/${blog?.slug}`} className="featured-item">
            <div className="image-wrapper">
                <Image src={blog?.image} alt={blog?.title} height="590" width="600" />
            </div>
            <div className="blog-info">
                <div>
                    <span onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        navigate(`/blogs?cat=${blog?.category.slug}`)
                    }} className="blog-category">{blog?.category?.title}</span>
                </div>
                <h3 className="title">{blog?.title}</h3>
                <p className="description">{blog?.description.length > 50 ? `${blog?.description.substring(0, 50)}...` : blog?.description}</p>
                {user && (
                    <button onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        handleLike()
                    }} title="Save Blog" className="save-blog-button">
                        {liked ? <FaHeart size={22} fill='red' /> : <FaRegHeart size={22} />}
                    </button>
                )}
            </div>
        </Link>
    );
};

export default FeaturedBlogItem;
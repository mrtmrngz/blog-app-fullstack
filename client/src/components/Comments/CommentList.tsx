import './CommentList.scss'
import Image from "../UI/Image.tsx";
import {FaStar} from "react-icons/fa";
import {Link} from "react-router";
import {FaTrash} from "react-icons/fa6";
import {CommentInterface} from "../../types.ts";
import {format} from "timeago.js";
import {useDeleteCommentMutation} from "../../services/commentService.ts";
import {useAuth} from "../../context/AuthContext.tsx";
import {FetchBaseQueryError} from "@reduxjs/toolkit/query/react";
import {toast} from "react-toastify";

interface CommentListProps {
    comments: CommentInterface[];
    setComments: (data: CommentInterface[]) => void
}

const CommentList = ({comments, setComments}: CommentListProps) => {

    const [deleteComment, {isError, error, isLoading}] = useDeleteCommentMutation()
    const {user} = useAuth()

    const handleDeleteComment = async (id: string) => {
        const result = await deleteComment(id).unwrap()

        if(result) {
            if(result.isDeleteSuccess) {
                toast.success(result.message)
                const filteredComments = comments.filter((c) => c.id !== result.deletedComment.id)
                setComments(filteredComments)
            }
        }
    }

    if(isError) {
        const deleteCommentFetchError = error as FetchBaseQueryError

        if(deleteCommentFetchError.status === 404 || deleteCommentFetchError.status === 401) {
            const errMessage = (deleteCommentFetchError?.data as {error: string})?.error || "Something goes wrong"
            toast.error(errMessage)
        }
    }

    return (
        <div className="comment-list-wrapper">
            <ul className="comment-list">
                {comments.map((comment: CommentInterface) => (
                    <li key={comment.id} className="comment-item">
                        <div className="user-info--rewiew-wrapper">
                            <div className="user-info-wrapper">
                                <Link to={`/profile/${comment?.user.username}`}>
                                    <div className="user-avatar">
                                        <Image src={comment?.user.avatar} alt={comment?.user.username} width="40"
                                               height="40"/>
                                    </div>
                                    <div className="user-info">
                                        <strong>{comment?.user.firstName} {comment?.user.lastName}</strong>
                                        <span>{format(comment?.createdAt)}</span>
                                    </div>
                                </Link>
                                {(user && (comment?.user.id === user?.id || user.role === "admin")) && (
                                    <button onClick={() => handleDeleteComment(comment?.id)} title="Delete Comment"
                                            aria-label="delete-comment"
                                            className="delete-comment-button">
                                        <FaTrash size={14}/>
                                    </button>
                                )}
                            </div>
                            <div className="review-wrapper">
                                <div aria-label="review-count">
                                    {Array.from({length: comment?.review}, (_, index) => (
                                        <span key={index}><FaStar size={16} className="star-icon"/></span>
                                    ))}
                                </div>
                                {isLoading && (
                                    <span style={{fontSize: '12px'}}>(Comment Deleting...)</span>
                                )}
                            </div>
                        </div>
                        <div className="comment-content">
                            <p>
                                {comment?.comment}
                            </p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CommentList;
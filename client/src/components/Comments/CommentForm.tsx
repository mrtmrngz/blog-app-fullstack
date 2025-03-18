import Image from "../UI/Image.tsx";
import { FaStar } from "react-icons/fa";
import Button from "../UI/Button.tsx";
import {UserTypes} from "../../types.ts";
import {FormEvent, useState} from "react";
import './CommentForm.scss'

interface CommentFormProps {
    user: UserTypes;
    onSubmitComment: (data: { comment: string; review: number }) => Promise<void> | void
}

const CommentForm = ({user, onSubmitComment}: CommentFormProps) => {
    const [review, setReview] = useState<number>(0)
    const [comment, setComment] = useState<string>("")

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if(review === 0 || comment === "") {
            return alert("Please add comment and review")
        }

        const data: {comment: string, review: number} = {
            comment,
            review
        }

        await onSubmitComment(data)
    }

    return (
        <div className="comment-form-wrapper">
            <div className="avatar-review-wrapper">
                <div className="avatar-wrapper">
                    <Image src={user?.avatar} alt="avatar" height="50" width="50" />
                </div>
                <div className="review-wrapper">
                    <button onClick={() => setReview(1)} className={`single-review ${review === 1 ? "active-star" : ""}`} aria-label="single-star">
                        <span><FaStar size={16} className="star-icon" /></span>
                    </button>
                    <button onClick={() => setReview(2)} className={`single-review ${review === 2 ? "active-star" : ""}`} aria-label="two-star">
                        <span><FaStar size={16} className="star-icon" /></span>
                        <span><FaStar size={16} className="star-icon" /></span>
                    </button>
                    <button onClick={() => setReview(3)} className={`single-review ${review === 3 ? "active-star" : ""}`} aria-label="three-star">
                        <span><FaStar size={16} className="star-icon" /></span>
                        <span><FaStar size={16} className="star-icon" /></span>
                        <span><FaStar size={16} className="star-icon" /></span>
                    </button>
                    <button onClick={() => setReview(4)} className={`single-review ${review === 4 ? "active-star" : ""}`} aria-label="four-star">
                        <span><FaStar size={16} className="star-icon" /></span>
                        <span><FaStar size={16} className="star-icon" /></span>
                        <span><FaStar size={16} className="star-icon" /></span>
                        <span><FaStar size={16} className="star-icon" /></span>
                    </button>
                    <button onClick={() => setReview(5)} className={`single-review ${review === 5 ? "active-star" : ""}`} aria-label="five-star">
                        <span><FaStar size={16} className="star-icon" /></span>
                        <span><FaStar size={16} className="star-icon" /></span>
                        <span><FaStar size={16} className="star-icon" /></span>
                        <span><FaStar size={16} className="star-icon" /></span>
                        <span><FaStar size={16} className="star-icon" /></span>
                    </button>
                </div>
            </div>
            <div className="form-wrapper">
                <form onSubmit={handleSubmit}>
                    <textarea onChange={(e) => setComment(e.target.value)} value={comment} placeholder="Enter your comment" name="comment" id="comment" rows={7} />
                    <Button className="comment-submit-btn" htmlType="submit">Add Comment</Button>
                </form>
            </div>
        </div>
    );
};

export default CommentForm;
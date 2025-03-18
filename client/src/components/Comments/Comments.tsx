import CommentForm from "./CommentForm.tsx";
import CommentList from "./CommentList.tsx";
import {useAuth} from "../../context/AuthContext.tsx";
import {CommentInterface} from "../../types.ts";

interface CommentProps {
    onSubmitComment: (data: {comment: string; review: number}) => Promise<void> | void;
    comments: CommentInterface[];
    setComments: (data: CommentInterface[]) => void
}

const Comments = ({onSubmitComment, comments, setComments}: CommentProps) => {
    const {user} = useAuth()

    return (
        <section className="comments-section">
            <h3 className="comments-title">Comments ({comments.length})</h3>
            {user && (
                <CommentForm user={user} onSubmitComment={onSubmitComment} />
            )}
            {comments.length > 0 ? (
                <CommentList setComments={setComments} comments={comments} />
            ) : (
                <span style={{marginTop: "20px", textAlign: "center", fontSize: "25px", display: 'block', fontWeight: '600'}}>There is no blog for this blog.</span>
            )}
        </section>
    );
};

export default Comments;
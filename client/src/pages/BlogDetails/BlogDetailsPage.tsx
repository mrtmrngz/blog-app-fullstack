import Container from "../../components/UI/Container.tsx";
import BlogInfo from "../../components/BlogDetails/BlogInfo/BlogInfo.tsx";
import Comments from "../../components/Comments/Comments.tsx";
import {Navigate, useParams} from "react-router";
import {useBlogDetailQuery} from "../../services/blogService.ts";
import Loader from "../../components/UI/Loader.tsx";
import {FetchBaseQueryError} from "@reduxjs/toolkit/query/react";
import {toast} from "react-toastify";
import DOMPurify from "dompurify";
import './BlogDetailsPage.scss'
import {useEffect, useState} from "react";
import {CommentInterface} from "../../types.ts";
import {useAddCommentMutation} from "../../services/commentService.ts";

const BlogDetailsPage = () => {

    const {slug} = useParams<{ slug: string }>()
    const {data, isLoading, error: fetchError, isError: isFetchError, isFetching, refetch} = useBlogDetailQuery({slug: slug!})
    const [comments, setComments] = useState<CommentInterface[]>([])

    const [addComment, {isError: isAddCommentError, error: addCommentError}] = useAddCommentMutation()

    const handleComment = async (commentData: {comment: string; review: number;}) => {
        const result = await addComment({...commentData, blogId: data?.id}).unwrap()

        if(result) {
            toast.success(result.message)
            if(result.isAddSuccess) {
                setComments(prevState => ([result.newComment, ...prevState]))
            }
        }
    }

    if(isAddCommentError) {
        const addFetch = addCommentError as FetchBaseQueryError
        if(addFetch.status === 404) {
            const errMessage = (addFetch?.data as {error: string})?.error || "Something goes wrong"
            toast.error(errMessage)
        }
    }

    useEffect(() => {
        refetch()
    }, [refetch]);

    useEffect(() => {
        if(data?.comments) {
            setComments(data?.comments)
        }
    }, [data]);

    if(isFetchError) {
        if((fetchError as FetchBaseQueryError).status === 404) {
            const errMessage = (fetchError as { data?: { error?: string } })?.data?.error || "An accurad error"
            toast.error(errMessage)
            return <Navigate to="/" replace />
        }
    }

    if(isLoading || isFetching) {
        return <Loader />
    }

    return (
        <article className="blog-details-page">
            <Container>
                <div className="blog-details-page-wrapper">
                    <BlogInfo id={data?.id} category={data?.category.title} title={data?.title} description={data?.description} image={data?.image} author={data?.author} createdAt={data?.createdAt} readerCount={data?.readerCount} likes={data?.likes} />
                    <section className="blog-content" dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(data?.content)}}></section>
                    <Comments setComments={setComments} onSubmitComment={handleComment} comments={comments} />
                </div>
            </Container>
        </article>
    );
};

export default BlogDetailsPage;
import './BlogList.scss'
import Container from "../../UI/Container.tsx";
import LikedReadedItem from "../MostLiked/LikedReadedItem.tsx";
import Button from "../../UI/Button.tsx";
import {useLazyGetBlogsQuery} from "../../../services/blogService.ts";
import Loader from "../../UI/Loader.tsx";
import {FetchBlogInterface} from "../../../types.ts";
import {useEffect, useState} from "react";
import {useSearchParams} from "react-router";

const BlogList = () => {

    const [page, setPage] = useState<number>(1)
    const [blogs, setBlogs] = useState<FetchBlogInterface[]>([]);
    const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);

    const [searchParams] = useSearchParams()

    const [fetchBlogs, { data, isError, error, isFetching, isLoading,}] = useLazyGetBlogsQuery()
    console.log(data)

    useEffect(() => {
        setBlogs([]);
        setPage(1);
        fetchBlogs({ page: 1, limit: 5, sort: Object.fromEntries([...searchParams]) });
    }, [searchParams, fetchBlogs]);

    useEffect(() => {
        if(data?.blog) {
            setBlogs((prevBlogs) => {
                const mergedBlogs = [...prevBlogs, ...data.blog]
                return mergedBlogs.filter((blog, index, self) => index === self.findIndex(b => b.id === blog.id))
            })
        }
    }, [data?.blog]);

    const loadMore = async () => {
        if (!isFetching) {
            setIsLoadingMore(true);
            const nextPage = page + 1
            setPage(nextPage);
            await fetchBlogs({ page: nextPage, limit: 5, sort: Object.fromEntries([...searchParams]) });
        }
    };

    useEffect(() => {
        if (!isFetching) {
            setIsLoadingMore(false);
        }
    }, [isFetching]);

    if(isError) {
        console.log(error)
    }

    if(isLoading) {
        return <Loader />
    }

    return (
        <div className="blog-list-wrapper">
            <Container className="blog-list-container">
                <nav>
                    <ul className="blog-list">
                        {blogs.map((blog: FetchBlogInterface) => (
                            <li key={blog.id} className="blog-list-item">
                                <LikedReadedItem blog={blog} />
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className="list-button-wrapper">
                    {data?.hasMore ? (
                        <Button onClick={loadMore}>
                            {isLoadingMore || isFetching ? "Loading..." : "Load More"}
                        </Button>
                    ) : (
                        <span style={{marginTop: "20px", fontSize: '25px', fontWeight: '600'}}>There is no blog anymore!!</span>
                    )}
                </div>
            </Container>
        </div>
    );
};

export default BlogList;
import './FeaturedBlogs.scss'
import Container from "../../UI/Container.tsx";
import FeaturedBlogItem from "./FeaturedBlogItem.tsx";
import SectionTitle from "../../UI/SectionTitle.tsx";
import gsap from "gsap";
import {useGSAP} from "@gsap/react";
import {useFeaturedQuery} from "../../../services/blogService.ts";
import Loader from "../../UI/Loader.tsx";
import {useEffect} from "react";

const FeaturedBlogs = () => {

    const {data, isError, error, isFetching, isLoading, refetch} = useFeaturedQuery(undefined)

    useGSAP(() => {
        const items = gsap.utils.toArray('.featured-blog-section .featured-item')

        gsap.from(items, {
            opacity: 0,
            scale: 0,
            duration: 0.8,
            stagger: 0.3,
            ease: 'back.out(1.3)',
        })
    })

    if(isError) {
        console.log(error)
    }
    useEffect(() => {
        refetch()
    }, [refetch]);

    if(isLoading || isFetching) {
        return <Loader />
    }

    return (
        <section className="featured-blog-section">
            <Container>
                <SectionTitle>Featured Blogs</SectionTitle>
                <div className="featured-blogs-wrapper">

                    {data[0] && (
                        <div className="left-side featured-item-wrapper">
                            <FeaturedBlogItem blog={data[0]} />
                        </div>
                    )}

                    <div className="right-side featured-item-wrapper">
                        <div className="right-side-double">
                            {data[1] && (
                                <FeaturedBlogItem blog={data[1]} />
                            )}

                            {data[2] && (
                                <FeaturedBlogItem blog={data[2]} />
                            )}

                        </div>

                        {data[3] && (
                            <FeaturedBlogItem blog={data[3]} />
                        )}
                    </div>

                </div>
            </Container>
        </section>
    );
};

export default FeaturedBlogs;
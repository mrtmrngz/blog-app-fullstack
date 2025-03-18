import Container from "../../UI/Container.tsx";
import LikedReadedItem from "../MostLiked/LikedReadedItem.tsx";
import SectionTitle from "../../UI/SectionTitle.tsx";
import {useGSAP} from "@gsap/react";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import gsap from 'gsap'
import './MostReaded.scss'
import {useMostReadedQuery} from "../../../services/blogService.ts";
import Loader from "../../UI/Loader.tsx";
import {FetchBlogInterface} from "../../../types.ts";
import {useEffect} from "react";

gsap.registerPlugin(ScrollTrigger)

const MostReaded = () => {

    const {data, isError, error, isFetching, isLoading, refetch} = useMostReadedQuery(undefined)

    useGSAP(() => {
        const blogCards = gsap.utils.toArray('.most-readed-section .most-readed-item');
        blogCards.forEach((card, index) => {
            const xValue = index % 2 === 0 ? -200 : 200;

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            gsap.from(card, {
                opacity: 0,
                x: xValue,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: card,
                    start: "top 80%",
                    end: "top 50%",
                    toggleActions: "play none none reverse",
                    markers: false,
                    invalidateOnRefresh: true
                }
            });
        });
    }, [])

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
        <section className="most-readed-section">
            <Container>
                <SectionTitle>Most Readed Blogs of This Week</SectionTitle>
                <div className="most-readed-wrapper">
                    <ul className="most-readed-list">
                        {data.map((blog: FetchBlogInterface) => (
                            <li key={blog.id} className="most-readed-item">
                                <LikedReadedItem blog={blog} />
                            </li>
                        ))}
                    </ul>
                </div>
            </Container>
        </section>
    );
};

export default MostReaded;
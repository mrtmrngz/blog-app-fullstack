import './MostLiked.scss'
import Container from "../../UI/Container.tsx";
import SectionTitle from "../../UI/SectionTitle.tsx";
import LikedReadedItem from "./LikedReadedItem.tsx";
import {useMostLikedQuery} from "../../../services/blogService.ts";
import Loader from "../../UI/Loader.tsx";
import {FetchBaseQueryError} from "@reduxjs/toolkit/query/react";
import {useEffect} from "react";

const MostLiked = () => {

    const {data, isError, error, isFetching, isLoading, refetch} = useMostLikedQuery(undefined)

    useEffect(() => {
        refetch()
    }, [refetch]);

    if (isLoading || isFetching) {
        return <Loader/>
    }

    if (isError) {
        if ((error as FetchBaseQueryError).status === 404) {
            const errMessage = (error as { data?: { error?: string } })?.data?.error || "An error occurred!";

            return (
                <section className="most-liked-section">
                    <h1 style={{textAlign: "center"}}>{errMessage}</h1>
                </section>
            );
        }
    }

    return (
        <section className="most-liked-section">
            <Container>
                <SectionTitle>Most Liked Blog of This Week</SectionTitle>
                <div className="most-liked-wrapper">
                    {data && <LikedReadedItem blog={data}/>}
                </div>
            </Container>
        </section>
    );
};

export default MostLiked;
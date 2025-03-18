import FeaturedBlogs from "../components/Blogs/FeaturedBlogs/FeaturedBlogs.tsx";
import MainCategories from "../components/Categories/MainCategories.tsx";
import MostLiked from "../components/Blogs/MostLiked/MostLiked.tsx";
import MostReaded from "../components/Blogs/MostReaded/MostReaded.tsx";

const HomePage = () => {
    return (
        <>
            <FeaturedBlogs />
            <MainCategories />
            <MostLiked />
            <MostReaded />
        </>
    );
};

export default HomePage;
import './BlogsPage.scss'
import Filter from "../components/Blogs/Filter/Filter.tsx";
import BlogList from "../components/Blogs/BlogList/BlogList.tsx";
import Button from "../components/UI/Button.tsx";
import Container from "../components/UI/Container.tsx";
import {useState} from "react";

const BlogsPage = () => {
    const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false)

    return (
        <section className="blogs-page-section">
            <Container className="button-container">
                <div className="filter-open-button">
                    <Button onClick={() => setIsFilterOpen(prev => !prev)} htmlType="button">{isFilterOpen ? "Close Filter" : "Open Filter"}</Button>
                </div>
            </Container>
            <Filter isOpen={isFilterOpen} />
            <BlogList />
        </section>
    );
};

export default BlogsPage;
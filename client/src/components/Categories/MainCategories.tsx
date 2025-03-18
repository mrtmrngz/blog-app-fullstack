import './MainCategories.scss'
import Container from "../UI/Container.tsx";
import {Link} from "react-router";
import {useHomeCategoriesQuery} from "../../services/categoryService.ts";
import Loader from "../UI/Loader.tsx";
import {CategoryTypes} from "../../types.ts";
import {useEffect} from "react";

const MainCategories = () => {

    const {data, isError, error, isLoading, isFetching, refetch} = useHomeCategoriesQuery(undefined)

    if (isError) {
        console.log(error)
    }

    useEffect(() => {
        refetch()
    }, [refetch]);

    if (isFetching || isLoading) {
        return <Loader/>
    }

    return (
        <section className="categories-section">
            <Container>
                <div className="categories-wrapper">
                    <nav>
                        <ul className="main-categories-links">
                            {data && data.map((category: CategoryTypes) => (
                                <li key={category.id} className="main-category-item">
                                    <Link to={`/blogs?cat=${category.slug}`}>{category.title}</Link>
                                </li>
                            ))}
                            <li className="main-category-item">
                                <Link to="/blogs">More</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </Container>
        </section>
    );
};

export default MainCategories;
import CustomSearch from "../../UI/CustomSearch.tsx";
import React, {useEffect, useState} from "react";
import Container from "../../UI/Container.tsx";
import {useAllCategoriesQuery} from "../../../services/categoryService.ts";
import Loader from "../../UI/Loader.tsx";
import {CategoryTypes} from "../../../types.ts";
import {useSearchParams} from "react-router";
import Button from "../../UI/Button.tsx";
import './Filter.scss'

const Filter = ({isOpen}: {isOpen: boolean}) => {

    const [searchValue, setSearchValue] = useState("")
    const [searchParams, setSearchParams] = useSearchParams()
    const [currentSort, setCurrentSort] = useState(searchParams.get('sort'))
    // const navigate = useNavigate()

    const {data, isLoading, isFetching, error, isError} = useAllCategoriesQuery(undefined)

    /*const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value
        const params = new URLSearchParams(searchParams)

        if(selectedValue === "") {
            params.delete("cat")
        }else {
            params.set('cat', selectedValue)
        }

        navigate(`?${decodeURIComponent(params.toString())}`)
    }*/

    const handleCategoryChange = (category: string) => {
        const params = new URLSearchParams(searchParams);

        if (category === "" || category === "all") {
            params.delete("cat");
        } else {
            params.set("cat", category);
        }

        setSearchParams(params);
    };

    const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const params = new URLSearchParams(searchParams)
        if (e.key === "Enter") {
            if(searchValue === "") {
                params.delete("search")
            }else {
                params.set('search', searchValue)
            }

            setSearchParams(params)
        }
    }

    const handleSort = (e: React.ChangeEvent<HTMLInputElement>) => {
        const sortName = e.target.value
        const params = new URLSearchParams(searchParams)

        if(sortName === "") {
            params.delete('sort')
        }else {
            params.set('sort', sortName)
        }

        setSearchParams(params)
    }

    const handleClearFilter = () => {
        setSearchParams({})
        setSearchValue("")
    }

    useEffect(() => {
        const sort = searchParams.get('sort')
        setCurrentSort(sort)
    }, [searchParams]);

    if(isError) {
        console.log(error)
    }

    if(isFetching || isLoading) {
        return <Loader />
    }

    return (
        <div className={`filter-wrapper ${isOpen ? "open" : "close"}`}>
            <Container>
                <div className="wrapper">
                    <h3 className="filter-title">Filter Blogs</h3>
                    <div className="sort-wrapper border-group">
                        <h5>Sort Blogs</h5>
                        <div className="group">
                            <input checked={currentSort === "newest"} onChange={handleSort} type="radio" name="sort" id="newest" value="newest"/>
                            <label htmlFor="newest">Newest Blogs</label>
                        </div>
                        <div className="group">
                            <input checked={currentSort === "oldest"} onChange={handleSort} type="radio" name="sort" id="oldest" value="oldest"/>
                            <label htmlFor="oldest">Oldest Blogs</label>
                        </div>
                        <div className="group">
                            <input checked={currentSort === "popular"} onChange={handleSort} type="radio" name="sort" id="popular" value="popular"/>
                            <label htmlFor="popular">Most Popular Blogs</label>
                        </div>
                    </div>
                    <div className="category-wrapper border-group">
                        <h5>Sort By Category</h5>
                        <select value={searchParams.get('cat') || ""} name="category" id="sort-by-category" onChange={(e) => handleCategoryChange(e.target.value)}>
                            <option value="">All Blogs</option>
                            {data.map((category: CategoryTypes) => (
                                <option key={category.id} value={category.slug}>{category.title}</option>
                            ))}
                        </select>
                    </div>
                    <div className="search-wrapper border-group">
                        <h5>Search Blogs</h5>
                        <CustomSearch value={searchValue} setValue={setSearchValue} onSearch={handleSearch} />
                    </div>
                    <div className="clear-filters">
                        <Button onClick={handleClearFilter} type='primary'>Clear Filter</Button>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Filter;
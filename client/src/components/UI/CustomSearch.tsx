import { CiSearch } from "react-icons/ci";
import React, {ChangeEvent} from "react";

interface SearchInterface {
    value: string
    setValue: (value: string) => void
    onSearch: (e: React.KeyboardEvent<HTMLInputElement>) => void
}

const CustomSearch = ({value, setValue, onSearch}:  SearchInterface) => {
    return (
        <div className="custom-search-wrapper">
            <CiSearch size={20} className="search-icon" />
            <input onKeyDown={onSearch} value={value} onChange={(e:ChangeEvent<HTMLInputElement>) => setValue(e.target.value)} type="text" placeholder="Search Something..." name="search-input" />
        </div>
    );
};

export default CustomSearch;
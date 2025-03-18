import Container from "../UI/Container.tsx";
import {Link, useLocation, useNavigate, useSearchParams} from "react-router";
import CustomSearch from "../UI/CustomSearch.tsx";
import React, {useEffect, useState} from "react";
import {FaBars} from "react-icons/fa6";
import {LiaTimesSolid} from "react-icons/lia";
import './Header.scss'
import Backdrop from "../UI/Backdrop.tsx";
import HeaderLinks from "./HeaderLinks.tsx";

const Header = () => {

    const [searchValue, setSearchValue] = useState("")
    const [isNavOpen, setIsNavOpen] = useState<boolean>(false)
    const {pathname} = useLocation()
    const [searchParams, setSearchParams] = useSearchParams()
    const navigate = useNavigate()

    const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const params = new URLSearchParams(searchParams)
        if (e.key === "Enter") {
            if(searchValue === "") {
                params.delete("search")
            }else {
                if(!pathname.startsWith("/blogs")) {
                    navigate(`/blogs?search=${searchValue}`)
                }
                params.set('search', searchValue)
            }
            setSearchParams(params)
        }
    }

    useEffect(() => {
        setIsNavOpen(false)
    }, [pathname])

    return (
        <header className="public-header">
            <Container>
                <div className="header-wrapper">

                    <div className="header-left">
                        <Link to="/" className="logo">BlogApp</Link>
                    </div>

                    <div className="header-center">
                        <CustomSearch value={searchValue} setValue={setSearchValue} onSearch={handleSearch}/>
                    </div>

                    <div className="header-right">
                        <HeaderLinks />
                    </div>

                    <div className="header-mobile">
                        <div className="mobile-open">
                            <button onClick={() => setIsNavOpen(true)} className="header-mobile-open-button">
                                <FaBars size={24}/>
                            </button>
                        </div>
                        <Backdrop onOpen={isNavOpen} onClose={() => setIsNavOpen(false)}/>
                        <div className={`mobile-links ${isNavOpen ? "open" : ""}`}>
                            <HeaderLinks />

                            <div className="mobile-close">
                                <button onClick={() => setIsNavOpen(false)} className="header-mobile-close-button">
                                    <LiaTimesSolid size={24}/>
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </Container>
        </header>
    );
};

export default Header;
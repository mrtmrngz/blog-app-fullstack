import Container from "../UI/Container.tsx";
import {Link} from "react-router";
import {FaGithub, FaInstagram} from "react-icons/fa";
import {FaXTwitter} from "react-icons/fa6";
import './Footer.scss'
import {useFooterCategoriesQuery} from "../../services/categoryService.ts";
import Loader from "../UI/Loader.tsx";
import {CategoryTypes} from "../../types.ts";


const Footer = () => {

    const {data, isFetching, isLoading, isError, error} = useFooterCategoriesQuery(undefined)

    if(isError) {
        console.log(error)
    }

    if(isFetching || isLoading) {
        return <Loader />
    }

    return (
        <footer>
            <div className="footer-wrapper">
                <Container>
                    <div className="footer-top">
                        <div className="footer-top_left">
                            <h3>BlogApp</h3>
                            <p>
                                Modern and user-friendly blog platform. Share your thoughts, gain knowledge and stay up to
                                date with the world of technology.
                            </p>
                            <div className="footer-left_links">
                                <nav>
                                    <ul className="footer-left-list">
                                        <li className="footer-left-link-item">
                                            <Link to="https://github.com/mrtmrngz" target="_blank">
                                                <FaGithub size={22}/>
                                            </Link>
                                        </li>
                                        <li className="footer-left-link-item">
                                            <Link to="https://www.instagram.com/mrt_mrngz/" target="_blank">
                                                <FaInstagram size={22}/>
                                            </Link>
                                        </li>
                                        <li className="footer-left-link-item">
                                            <Link to="https://x.com/Nrxlas" target="_blank">
                                                <FaXTwitter size={22}/>
                                            </Link>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                        <div className="footer-top_right">
                            <nav>
                                <div className="footer-right-list-wrapper">
                                    <h4>Quick Links</h4>
                                    <ul>
                                        <li>
                                            <Link to="/">Home</Link>
                                        </li>
                                        <li>
                                            <Link to="/">About Us</Link>
                                        </li>
                                        <li>
                                            <Link to="/">Contact</Link>
                                        </li>
                                        <li>
                                            <Link to="/">Policy</Link>
                                        </li>
                                    </ul>
                                </div>
                                <div className="footer-right-list-wrapper">
                                    <h4>Categories</h4>
                                    <ul>
                                        {data.map((category: CategoryTypes) => (
                                            <li key={category.id}>
                                                <Link to={`/blogs?cat=${category.slug}`}>{category.title}</Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="footer-right-list-wrapper">
                                    <h4>Contact</h4>
                                    <ul className="contact-list">
                                        <li>
                                            <span>Email: </span>
                                            <span>example@mail.com</span>
                                        </li>
                                        <li>
                                            <span>Address: </span>
                                            <span>Istanbul, TURKEY</span>
                                        </li>
                                    </ul>
                                </div>
                            </nav>
                        </div>
                    </div>
                </Container>
                <div className="footer-bottom">
                    <span className="footer-bottom-badge">© 2024 BlogApp.</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
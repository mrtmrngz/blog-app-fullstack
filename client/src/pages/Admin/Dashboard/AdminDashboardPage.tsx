import './AdminDashboardPage.scss'
import Image from "../../../components/UI/Image.tsx";
import {useDashboardQuery} from "../../../services/AdminServices/dashboardService.ts";
import Loader from "../../../components/UI/Loader.tsx";
import {toast} from "react-toastify";
import {Navigate} from "react-router";
import {useEffect} from "react";

const AdminDashboardPage = () => {

    const {data, isError, isLoading, isFetching, refetch} = useDashboardQuery(undefined)

    useEffect(() => {
        refetch()
    }, []);

    if(isError) {
        toast.error("Somethings goes wrong")
        return <Navigate to="/" replace />
    }

    if(isFetching || isLoading) {
        return <Loader />
    }

    return (
        <section className="admin-dashboard-section">
            <div className="admin-dashboard-wrapper">
                <ul className="admin-dashboard-list">
                    <li className="admin-dashboard-item">
                        <div className="image-wrapper">
                            <Image src="category-count.png" alt="category-image" width="100" />
                        </div>
                        <div className="info-wrapper">
                            <h3 className="info-header">Category Info</h3>
                            <div className="info">
                                <div className="info-group">
                                    <strong>Category Count:</strong>
                                    <span>{data?.categoryCount}</span>
                                </div>
                                <div className="info-group">
                                    <strong>Category with the Most Content: </strong>
                                    <span>{data?.categoryHasMostBlog.title}</span>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li className="admin-dashboard-item">
                        <div className="image-wrapper">
                            <Image src="blog-count.webp" alt="blog-image" width="100" />
                        </div>
                        <div className="info-wrapper">
                            <h3 className="info-header">Blog Info</h3>
                            <div className="info">
                                <div className="info-group">
                                    <strong>Blog Count:</strong>
                                    <span>{data?.blogCount}</span>
                                </div>
                                <div className="info-group">
                                    <strong>Most Readed Blog:</strong>
                                    <span>{data?.mostReadedBlog.title}</span>
                                </div>
                                <div className="info-group">
                                    <strong>The Most Blogged Author:</strong>
                                    <span>{data?.bestAuthor.firstName} {data?.bestAuthor.lastName}</span>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li className="admin-dashboard-item">
                        <div className="image-wrapper">
                            <Image src="user-image.webp" alt="blog-image" width="100" />
                        </div>
                        <div className="info-wrapper">
                            <h3 className="info-header">Users Info</h3>
                            <div className="info">
                                <div className="info-group">
                                    <strong>User Count:</strong>
                                    <span>{data?.userCount}</span>
                                </div>
                                <div className="info-group">
                                    <strong>First User</strong>
                                    <span>{data?.firstUser.firstName} {data?.firstUser.lastName}</span>
                                </div>
                                <div className="info-group">
                                    <strong>Last User</strong>
                                    <span>{data?.lastUser.firstName} {data?.lastUser.lastName}</span>
                                </div>
                                <div className="info-group">
                                    <strong>The Most Blogged Author:</strong>
                                    <span>{data?.bestAuthor.firstName} {data?.bestAuthor.lastName}</span>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </section>
    );
};

export default AdminDashboardPage;
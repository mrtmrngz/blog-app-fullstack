import './ProfileBlogs.scss'
import Container from "../../UI/Container.tsx";
import TabMenu from "../TabMenu/TabMenu.tsx";
import {useEffect, useRef, useState} from "react";
import ProfileBlogItem from "./Item/ProfileBlogItem.tsx";
import AlertModal from "../../UI/Modals/AlertModal.tsx";
import {useGSAP} from "@gsap/react";
import gsap from 'gsap'
import {useAuth} from "../../../context/AuthContext.tsx";
import {useParams} from "react-router";
import {useDeleteBlogMutation, useLikedBlogsQuery, useProfileBlogsQuery} from "../../../services/blogService.ts";
import Loader from "../../UI/Loader.tsx";
import {ProfileBlogTypes} from "../../../types.ts";
import {toast} from "react-toastify";
import {FetchBaseQueryError} from "@reduxjs/toolkit/query/react";

const ProfileBlogs = () => {

    const [selectedTab, setSelectedTab] = useState<"my-blogs" | "my-favorites">("my-blogs")
    const [isModalInvalid, setIsModalInvalid] = useState<boolean>(false)
    const [isAlertModalOpen, setIsAlertModalOpen] = useState<boolean>(false)
    const [selectedBlog, setSelectedBlog] = useState<string | null>(null)
    const modalRef = useRef(null)
    const {user} = useAuth()
    const {slug} = useParams()

    const {data: profileBlogsData, refetch: blogRefech, isLoading: profileBlogsLoading, isFetching: profileBlogsFetching} = useProfileBlogsQuery(slug!)

    const {data: likedBlogsData, refetch: likeRefech, isLoading: likedBlogsLoading, isFetching: likedBlogsFetching} = useLikedBlogsQuery(slug!)

    const [deleteBlog, {isError: isDeleteError, error: deleteError}] = useDeleteBlogMutation()

    useGSAP(() => {
        if (isAlertModalOpen) {
            gsap.fromTo(modalRef?.current, {opacity: 0}, {
                opacity: 1,
                duration: .7,
                ease: 'power2.out'
            })
        }


        if (!isAlertModalOpen && isModalInvalid) {
            gsap.to(modalRef?.current, {
                opacity: 0,
                duration: .2,
                onComplete: () => {
                    setIsModalInvalid(false)
                }
            })
        }
    }, [isAlertModalOpen, isModalInvalid])

    useEffect(() => {
        if(!user || user?.username !== slug) {
            setSelectedTab('my-favorites')
        }
    }, [slug, user]);

    useEffect(() => {
        blogRefech()
        likeRefech()
    }, [blogRefech, likeRefech]);

    const handleDeleteBlog = async () => {
        if (!selectedBlog) return

        const result = await deleteBlog({blogId: selectedBlog}).unwrap()

        if(result) {
            toast.success(result.message)
            blogRefech()
            setIsAlertModalOpen(false)
            setSelectedBlog(null)
        }

    }

    if(isDeleteError) {
        const deleteErrorType = deleteError as FetchBaseQueryError
        if(deleteErrorType.status === 404 || deleteErrorType.status === 401) {
            const errMessage = (deleteErrorType?.data as {error?: string})?.error || "Something goes wrong"
            toast.error(errMessage)
        }
    }

    if(profileBlogsLoading || profileBlogsFetching || likedBlogsFetching || likedBlogsLoading) {
        return <Loader />
    }

    return (
        <>
            <section className="profile-blogs-section">
                <Container>
                    {user && user.username === slug ? (
                        <div className="profile-blogs-wrapper">
                            <TabMenu selectedTab={selectedTab} onSelectTab={setSelectedTab}/>
                        </div>
                    ) : (
                        <h3 style={{marginBottom: "30px", fontSize: '22px'}}>Users Blog</h3>
                    )}
                    <div className="profile-blogs">
                        <ul className="profile-blog-list">

                            {(user && user.username === slug) && (
                                <>
                                    {selectedTab === 'my-blogs' && profileBlogsData.map((blog: ProfileBlogTypes) => (
                                        <li key={blog.id} className="profile-blog-item">
                                            <ProfileBlogItem blog={blog} selectedTab={selectedTab} setIsModalInvalid={setIsModalInvalid}
                                                             setSelectedBlog={setSelectedBlog}
                                                             setIsAlertModalOpen={setIsAlertModalOpen}/>
                                        </li>
                                    ))}

                                    {selectedTab === 'my-favorites' && likedBlogsData.map((blog: ProfileBlogTypes) => (
                                        <li key={blog.id} className="profile-blog-item">
                                            <ProfileBlogItem blog={blog} selectedTab={selectedTab} setIsModalInvalid={setIsModalInvalid}
                                                             setSelectedBlog={setSelectedBlog}
                                                             setIsAlertModalOpen={setIsAlertModalOpen}/>
                                        </li>
                                    ))}
                                </>
                            )}

                            {user?.username !== slug && (
                                profileBlogsData.map((blog: ProfileBlogTypes) => (
                                    <li key={blog.id} className="profile-blog-item">
                                        <ProfileBlogItem blog={blog} selectedTab={selectedTab} setIsModalInvalid={setIsModalInvalid}
                                                         setSelectedBlog={setSelectedBlog}
                                                         setIsAlertModalOpen={setIsAlertModalOpen}/>
                                    </li>
                                ))
                            )}
                        </ul>
                    </div>
                </Container>
            </section>
            {isModalInvalid && (
                <section>
                    <AlertModal onOpen={isAlertModalOpen} onClose={() => setIsAlertModalOpen(false)}
                                alertMessage="Are you sure you want to delete this blog?" submitButtonText="Delete Blog"
                                submit={handleDeleteBlog} modalRef={modalRef}/>
                </section>
            )}
        </>
    );
};

export default ProfileBlogs;
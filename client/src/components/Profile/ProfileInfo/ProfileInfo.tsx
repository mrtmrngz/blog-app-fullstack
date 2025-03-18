import Container from "../../UI/Container.tsx";
import Image from "../../UI/Image.tsx";
import Button from "../../UI/Button.tsx";
import {FaUserEdit} from "react-icons/fa";
import {FiLogOut} from "react-icons/fi";
import {RiUserFollowLine} from "react-icons/ri";
import {SlCalender} from "react-icons/sl";
import {FaPlus} from "react-icons/fa";
import './ProfileInfo.scss'
import {Navigate, useNavigate, useParams} from "react-router";
import {useAuth} from "../../../context/AuthContext.tsx";
import apiRequest from "../../../libs/apiRequest.ts";
import {toast} from "react-toastify";
import {useFollowServiceMutation, useProfileInfoQuery} from "../../../services/userService.ts";
import Loader from "../../UI/Loader.tsx";
import {useEffect, useState} from "react";

const ProfileInfo = () => {

    const {user} = useAuth()
    const {slug} = useParams()
    const navigate = useNavigate()

    const {
        data: profileInfo,
        isFetching: profileInfoFetching,
        refetch
    } = useProfileInfoQuery(slug ?? "")

    const [followService, {isLoading: followLoading, isError, error}] = useFollowServiceMutation()
    const [followers, setFollowers] = useState<number>(profileInfo?._count.follower || 0)
    const [isFollow, setIsFollow] = useState<boolean>(!!profileInfo?.follower.find((f: { followingId: string | undefined; }) => f.followingId === user?.id))

    const handleLogout = async () => {
        try {
            const response = await apiRequest.post('/auth/logout')

            if (response?.status === 200) {
                toast.warning(response?.data?.message)
                window.location.href = "/auth/login"
            }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
            toast.error("Something goes wrong!")
        }
    }

    const handleFollow = async () => {
        try {
            const results = await followService(profileInfo?.id).unwrap()

            if (results) {
                toast.success(results.message)
                if(isFollow) {
                    setFollowers(prev => prev - 1)
                    setIsFollow(false)
                }else {
                    setFollowers(prev => prev + 1)
                    setIsFollow(true)
                }
            }
        } catch (err) {
            const errorMessage = (err as { data?: { error?: string } })?.data?.error || "Something goes wrong!";
            toast.error(errorMessage);
        }
    }

    useEffect(() => {
        refetch()
        if(profileInfo) {
            setFollowers(profileInfo?._count.follower)
            setIsFollow(!!profileInfo?.follower.find((f: { followingId: string | undefined; }) => f.followingId === user?.id))
        }
    }, [profileInfo, refetch, user?.id])

    if (profileInfoFetching) {
        return <Loader/>
    }

    if (isError) {
        const errMessage = (error as { data?: { error?: string } })?.data?.error || "An error occurred!"
        toast.error(errMessage)
        return <Navigate to="/" replace/>
    }

    return (
        <section className="profile-info-section">
            <Container>
                <div className="profile-info-wrapper">
                    <div className="avatar-wrapper">
                        <Image width="180" height="180" src={profileInfo?.avatar || ""} alt="avatar"/>
                    </div>
                    <div className="profile-info">
                        <h1 className="username">{profileInfo?.firstName} {profileInfo?.lastName}</h1>
                        {profileInfo?.bio && (
                            <p className="description">{profileInfo.bio}</p>
                        )}
                        <div className="profile-actions">
                            {user?.username === profileInfo?.username && (
                                <Button onClick={() => navigate(`/profile/edit/${profileInfo?.username}`)}
                                        className="profile-action-button">
                                    <FaUserEdit size={20}/>
                                    <span>Edit</span>
                                </Button>
                            )}
                            {user?.username === profileInfo?.username && (
                                <Button onClick={() => navigate("/new-blog")} type="accent"
                                        className="profile-action-button add-blog-btn">
                                    <FaPlus size={20}/>
                                    <span>Add Blog</span>
                                </Button>
                            )}
                            {user?.username !== profileInfo?.username && (
                                <Button loading={followLoading} onClick={handleFollow} type="secondary"
                                        className="profile-action-button">
                                    <RiUserFollowLine size={20}/>
                                    <span>
                                        {isFollow ? "Unfollow" : "Follow"}
                                    </span>
                                </Button>
                            )}
                            {user?.username === profileInfo?.username && (
                                <Button onClick={handleLogout} type="danger" className="profile-action-button">
                                    <FiLogOut size={20}/>
                                    <span>Logout</span>
                                </Button>
                            )}
                        </div>
                        <div className="action-info">
                            <div className="single-action">
                                <h2>{profileInfo?._count.blogs}</h2>
                                <span>Post</span>
                            </div>
                            <div className="single-action">
                                <h2>{followers}</h2>
                                <span>Followers</span>
                            </div>
                            <div className="single-action">
                                <h2>{profileInfo?._count.following}</h2>
                                <span>Following</span>
                            </div>
                        </div>
                        <div className="join-date">
                            <SlCalender size={14} fill="#1E88E5"/>
                            <span>January, 2024</span>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default ProfileInfo;
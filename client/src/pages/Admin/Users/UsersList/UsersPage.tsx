import {AdminUserListTypes, CustomTableData} from "../../../../types.ts";
import Image from "../../../../components/UI/Image.tsx";
import {Link, Navigate} from "react-router";
import CustomTable from "../../../../components/UI/CustomTable/CustomTable.tsx";
import './UsersList.scss'
import {useAdminUserListQuery, useDeleteUserMutation} from "../../../../services/userService.ts";
import {useEffect} from "react";
import {toast} from "react-toastify";
import Loader from "../../../../components/UI/Loader.tsx";
import {formattedDate} from "../../../../utils/generateDate.ts";
import {FetchBaseQueryError} from "@reduxjs/toolkit/query/react";


const UsersPage = () => {

    const {data, isError: isFetchingError, error: fetchingError, isFetching: fetchingFetching, isLoading: fetchingLoading, refetch} = useAdminUserListQuery(undefined)

    const [deleteUser, {isError, error, isLoading}] = useDeleteUserMutation()

    const handleDeleteUser = async (userId: string) => {
        const results = await deleteUser(userId).unwrap()
        if(results) {
            toast.success(results.message)
            refetch()
        }
    }

    const tableColumns: CustomTableData<AdminUserListTypes>[] = [
        {
            key: "avatar",
            className: 'avatar',
            label: "Avatar",
            width: "5%",
            render: (item) => {
                return <div className="image-wrapper">
                    <Image src={item?.avatar} alt={item?.username} width="75" height="110" />
                </div>
            }
        },
        {
            key: "fullName",
            className: 'fullName',
            label: "Full Name",
            width: "25%",
            render: (item) => {
                return <strong>{item?.firstName} {item?.lastName}</strong>
            }
        },
        {
            key: "username",
            className: 'username',
            label: "Username",
            width: "20%",
            render: (item) => {
                return <span>{item?.username}</span>
            }
        },
        {
            key: "role",
            className: 'role',
            label: "Role",
            width: '15%',
            render: (item) => {
                return <strong>{item?.role}</strong>
            }
        },
        {
            key: "createdAt",
            className: 'createdAt',
            label: "Created At",
            width: "15%",
            render: (item) => {
                return <span>{formattedDate(item?.createdAt)}</span>
            }
        },
        {
            key: "actions",
            className: "actions",
            label: "Actions",
            width: '15%',
            render: (item) => {
                return (
                    <div className="admin-tables-button-wrapper">
                        <Link className="update-btn" to={`/admin/users/update/${item?.username}`}>Update</Link>
                        <button onClick={() => handleDeleteUser(item?.id)} disabled={isLoading} className="delete-btn">Delete</button>
                    </div>
                )
            }
        }
    ]

    useEffect(() => {
        refetch()
    }, [refetch])

    if(isError) {
        const errType = error as FetchBaseQueryError
        if(errType.status === 404 || errType.status === 401) {
            const errMessage = (errType?.data as {error?: string})?.error || "Somethings goes wrong"
            toast.error(errMessage)
        }
    }

    if(isFetchingError) {
        toast.error("Something goes wrong")
        console.log(fetchingError)
        return <Navigate to="/" replace />
    }

    if(fetchingFetching || fetchingLoading) {
        return <Loader />
    }

    return (
        <section className="admin-user-list-section">
            <CustomTable tableKey="id" data={data} columns={tableColumns} tableClass="admin-user-list-table" />
        </section>
    );
};

export default UsersPage;
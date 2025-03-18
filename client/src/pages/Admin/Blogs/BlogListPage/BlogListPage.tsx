import {CustomTableData} from "../../../../types.ts";
import Image from "../../../../components/UI/Image.tsx";
import {Link, Navigate} from "react-router";
import CustomTable from "../../../../components/UI/CustomTable/CustomTable.tsx";
import './BlogListPage.scss'
import {useFetchAllBlogsQuery} from "../../../../services/AdminServices/blogService.ts";
import Loader from "../../../../components/UI/Loader.tsx";
import {toast} from "react-toastify";
import {formattedDate} from "../../../../utils/generateDate.ts";
import {useEffect} from "react";
import {useDeleteBlogMutation} from "../../../../services/blogService.ts";
import {FetchBaseQueryError} from "@reduxjs/toolkit/query/react";

interface AdminBlogType {
    id: string
    title: string
    image: string
    categoryId: string
    category: {
        id: string;
        title: string
    }
    authorId: string;
    author: {
        id: string;
        firstName: string;
        lastName: string;
    }
    readerCount: number;
    slug: string;
    description: string;
    content: string
    createdAt: string
    updatedAt: string
}

const BlogListPage = () => {

    const {data, isLoading, isError, isFetching, refetch} = useFetchAllBlogsQuery(undefined)
    const [deleteBlog, {isError: isDeleteError, error: deleteError}] = useDeleteBlogMutation()

    const handleDelete = async (blogId: string) => {
        const result = await deleteBlog({blogId, isAdminAction: true}).unwrap()

        if(result) {
            toast.success(result.message)
            refetch()
        }
    }

    const tableColumns:CustomTableData<AdminBlogType>[] = [
        {
            key: "image",
            className: "image",
            label: "Image",
            width: "10%",
            render: (item) => {
                return (
                    <div className="image-wrapper">
                        <Image src={item?.image} alt={item?.title} height="80" />
                    </div>
                )
            }
        },
        {
            key: "title",
            className: "title",
            label: "Blog Title",
            width: "30%",
            render: (item) => {
                return <strong>{item?.title}</strong>
            }
        },
        {
            key: "category",
            className: "category",
            label: "Category",
            width: "20%",
            render: (item) => {
                return <span>{item?.category.title}</span>
            }
        },
        {
            key: "author",
            className: "author",
            label: "Blog Title",
            render: (item) => {
                return <strong>{item?.author.firstName} {item?.author.lastName}</strong>
            }
        },
        {
            key: "createdAt",
            className: "createdAt",
            label: "Created At",
            render: (item) => {
                return <span>{formattedDate(item?.createdAt)}</span>
            }
        },
        {
            key: "actions",
            className: "actions",
            label: "Actions",
            render: (item) => {
                return (
                    <div className="admin-tables-button-wrapper">
                        <Link className="update-btn" to={`/admin/blogs/update/${item?.slug}`}>Update</Link>
                        <button className="delete-btn" onClick={() => handleDelete(item?.id)}>Delete</button>
                    </div>
                )
            }
        }
    ]

    useEffect(() => {
        refetch()
    }, [refetch]);

    if(isDeleteError) {
        const deleteErrorType = deleteError as FetchBaseQueryError
        if(deleteErrorType.status === 404 || deleteErrorType.status === 401) {
            const errMessage = (deleteErrorType?.data as {error?: string})?.error || "Something goes wrong"
            toast.error(errMessage)
        }
    }

    if(isError) {
        toast.error("Something goes wrong")
        return <Navigate to="/" replace />
    }

    if(isFetching || isLoading) {
        return <Loader />
    }

    return (
        <section className="admin-blog-list-section">
            <CustomTable tableKey="id" data={data} columns={tableColumns} tableClass="admin-blog-table" />
        </section>
    );
};

export default BlogListPage;
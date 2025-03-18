import {useNavigate, useParams} from "react-router";
import {useDeleteBlogMutation, useUpdateBlogFetchQuery, useUpdateBlogMutation} from "../../../services/blogService.ts";
import {BlogTypesWithoutIds} from "../../../types.ts";
import {FormikHelpers} from "formik";
import {toast} from "react-toastify";
import {FetchBaseQueryError} from "@reduxjs/toolkit/query/react";
import {useEffect} from "react";
import Loader from "../../UI/Loader.tsx";
import BlogForm from "../BlogForm/BlogForm.tsx";

const UpdateBlogPageBase = ({isAdminAction=false}: {isAdminAction?:boolean}) => {

    const {slug} = useParams()
    const navigate = useNavigate()

    const safeSlug = slug ?? ""
    const {data: fetchData, isFetching, isLoading: fetchLoading, isError: isFetchError, error: fetchError, refetch} = useUpdateBlogFetchQuery({slug: safeSlug, isAdminAction})

    const [updateBlog, {isLoading: updateLoading, isError: isUpdateError, error: updateError}] = useUpdateBlogMutation()
    const [deleteBlog, {isError: isDeleteError, error: deleteError}] = useDeleteBlogMutation()

    const initialValues = {
        title: fetchData?.title || "",
        description: fetchData?.description || "",
        content: fetchData?.content || "",
        image: fetchData?.image || "",
        categoryId: fetchData?.categoryId || "",
    }

    const handleSubmit = async (values: BlogTypesWithoutIds, actions: FormikHelpers<BlogTypesWithoutIds>) => {
        const results = await updateBlog({id: fetchData?.id, data: values, isAdminAction}).unwrap()

        if(results) {
            toast.success(results.message)
            actions.resetForm()
            navigate(isAdminAction ? `/admin/blogs` : `/blog/${results.updatedBlog.slug}`)
        }
    }

    const handleDelete = async () => {
        const result = await deleteBlog({blogId: fetchData?.id, isAdminAction}).unwrap()

        if(result) {
            toast.success(result.message)
            navigate(isAdminAction ? `/admin/blogs`: "/blogs")
        }
    }

    if(isFetchError) {
        const fetchErrorType = fetchError as FetchBaseQueryError;
        if(fetchErrorType.status === 404 || fetchErrorType.status === 401) {
            const errMessageFetch = (fetchErrorType?.data as {error?: string})?.error || "Something goes wrong"
            toast.error(errMessageFetch)
            navigate("/")
        }
    }

    if(isUpdateError) {
        const updateErrorType = updateError as FetchBaseQueryError;
        if(updateErrorType.status === 401 || updateErrorType.status === 404) {
            const errMessageUpdate = (updateErrorType?.data as {error?: string})?.error || "Something goes wrong"
            toast.error(errMessageUpdate)
        }
    }

    if(isDeleteError) {
        const deleteErrorType = deleteError as FetchBaseQueryError
        if(deleteErrorType.status === 404 || deleteErrorType.status === 401) {
            const errMessage = (deleteErrorType?.data as {error?: string})?.error || "Something goes wrong"
            toast.error(errMessage)
        }
    }

    useEffect(() => {
        refetch()
    }, [refetch]);

    if(isFetching || fetchLoading) {
        return <Loader />
    }

    return <BlogForm values={initialValues} onSubmit={handleSubmit} isEdit actionLoading={updateLoading} handleDelete={handleDelete} />
};

export default UpdateBlogPageBase;
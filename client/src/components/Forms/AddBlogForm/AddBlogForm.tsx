import {useAddBlogMutation} from "../../../services/blogService.ts";
import {useNavigate} from "react-router";
import {BlogTypesWithoutIds} from "../../../types.ts";
import {FormikHelpers} from "formik";
import {toast} from "react-toastify";
import {FetchBaseQueryError} from "@reduxjs/toolkit/query/react";
import BlogForm from "../BlogForm/BlogForm.tsx";

const AddBlogForm = ({isAdmin=false}: {isAdmin?: boolean}) => {

    const [addBlog, {isLoading: actionLoading, isError: isActionError, error: actionError}] = useAddBlogMutation()
    const navigate = useNavigate()

    const initialValues = {
        title: "",
        description: '',
        content: '',
        image: '',
        categoryId: '',
    }

    const handleSubmit = async (values: BlogTypesWithoutIds, actions: FormikHelpers<BlogTypesWithoutIds>) => {
        const result = await addBlog({data: values, isAdminAction: isAdmin}).unwrap()

        if(result) {
            toast.success(result.message)
            actions.resetForm()
            navigate(`/blog/${result.newBlog.slug}`)
        }
    }

    if(isActionError) {
        const actionErrorType = actionError as FetchBaseQueryError;

        if(actionErrorType.status === 401) {
            const errMessage = (actionErrorType?.data as {error?: string})?.error || "Something goes wrong"
            toast.error(errMessage)
        }
    }

    return <BlogForm values={initialValues} onSubmit={handleSubmit} actionLoading={actionLoading} />
};

export default AddBlogForm;
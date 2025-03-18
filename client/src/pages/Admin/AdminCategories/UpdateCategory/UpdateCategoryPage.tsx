import {FormikHelpers} from "formik";
import AdminCategoryForm from "../../../../components/Forms/AdminCategoryForm/AdminCategoryForm.tsx";
import {Navigate, useNavigate, useParams} from "react-router";
import {
    useFetchSingleCategoryQuery,
    useUpdateCategoryMutation
} from "../../../../services/AdminServices/categoryService.ts";
import Loader from "../../../../components/UI/Loader.tsx";
import {toast} from "react-toastify";
import {useEffect} from "react";

const UpdateCategoryPage = () => {

    const {slug} = useParams()
    const navigate = useNavigate()

    const {data, isFetching: fetchFetching, isLoading: fetchLoading, isError: fetchError, error: fetchErrorMessage} = useFetchSingleCategoryQuery(slug!)

    const [updateCategory, {isLoading, isError, error}] = useUpdateCategoryMutation()

    const initialValues = {
        title: data?.title || ""
    }

    const handleSubmit = async (values: {title: string}, actions: FormikHelpers<{title: string}>) => {
        const result = await updateCategory({slug: data?.slug, title: values.title}).unwrap()

        if(result) {
            toast.success(result.message)
            actions.resetForm()
            navigate("/admin/categories")
        }
    }

    useEffect(() => {
        if (fetchError) {
            const errMessage = (fetchErrorMessage as { data?: { error?: string } })?.data?.error || "An error occurred!"
            toast.error(errMessage)
        }
    },[fetchError, fetchErrorMessage])

    if(isError) {
        console.log(error)
    }

    if(fetchError) {
        return <Navigate to="/admin/categories" replace />
    }

    if(fetchFetching || fetchLoading) {
        return <Loader />
    }

    return <AdminCategoryForm loading={isLoading} isEdit initialValues={initialValues} onSubmit={handleSubmit} />
};

export default UpdateCategoryPage;
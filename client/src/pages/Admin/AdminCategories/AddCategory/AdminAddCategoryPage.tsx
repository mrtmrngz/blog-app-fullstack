import AdminCategoryForm from "../../../../components/Forms/AdminCategoryForm/AdminCategoryForm.tsx";
import {FormikHelpers} from "formik";
import {useCreateCategoryMutation} from "../../../../services/AdminServices/categoryService.ts";
import {toast} from "react-toastify";
import {useNavigate} from "react-router";

const AdminAddCategoryPage = () => {

    const [createCategory, {isLoading}] = useCreateCategoryMutation()
    const navigate = useNavigate()

    const initialValues = {
        title: ""
    }

    const handleSubmit = async (values: {title: string}, actions: FormikHelpers<{title: string}>) => {
        const result = await createCategory(values).unwrap()

        if(result) {
            toast.success(result.message)
            actions.resetForm()
            navigate("/admin/categories")
        }
    }

    return <AdminCategoryForm loading={isLoading} initialValues={initialValues} onSubmit={handleSubmit} />
};

export default AdminAddCategoryPage;
import {Form, Formik, FormikHelpers} from "formik";
import CustomInput from "../../Inputs/CustomInput/CustomInput.tsx";
import './AdminCategoryForm.scss'
import Button from "../../UI/Button.tsx";
import {useNavigate} from "react-router";

interface FormProps {
    initialValues: {
        title: string
    }
    onSubmit: (values: {title: string}, actions: FormikHelpers<{title: string}>) => void
    isEdit?: true
    loading: boolean
}

const AdminCategoryForm = ({initialValues, onSubmit, isEdit, loading}: FormProps) => {

    const navigate = useNavigate()

    return (
        <section className="admin-category-form-section">
            <div className="wrapper">
                <Formik initialValues={initialValues} onSubmit={onSubmit} enableReinitialize>
                    {() => (
                        <Form className="admin-category-form">
                            <CustomInput name="title" placeholder="Enter Category Title" isRequired />
                            <div className="button-wrapper">
                                <Button onClick={() => navigate(-1)} type={isEdit ? "accent" : "danger"}>Cancel</Button>
                                <Button loading={loading} htmlType="submit">{!isEdit ? "Add Category" : "Edit Category"}</Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </section>
    );
};

export default AdminCategoryForm;
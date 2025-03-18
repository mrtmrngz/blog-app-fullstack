import {Form, Formik, FormikHelpers} from "formik";
import {adminUpdateUserValidation} from "../../../../validations/userValidations.ts";
import CustomInput from "../../../../components/Inputs/CustomInput/CustomInput.tsx";
import Button from "../../../../components/UI/Button.tsx";
import Image from "../../../../components/UI/Image.tsx";
import {CiEdit} from "react-icons/ci";
import './UpdateUserPage.scss'
import {useNavigate, useParams} from "react-router";
import {useEditInfoQuery, useUpdateUserMutation} from "../../../../services/userService.ts";
import {useEffect, useState} from "react";
import Loader from "../../../../components/UI/Loader.tsx";
import {FetchBaseQueryError} from "@reduxjs/toolkit/query/react";
import {toast} from "react-toastify";
import Upload from "../../../../components/UI/Upload.tsx";

interface AdminUserFormTypes {
    avatar: string
    email: string
    password: string
    role: string
}

const UpdateUserPage = () => {

    const navigate = useNavigate()
    const {slug} = useParams()
    const safeSlug = slug ?? ""
    const [progress, setProgress] = useState<number>(0)
    const {
        data,
        isError: isFetchError,
        error: fetchError,
        isLoading: fetchLoading,
        isFetching: fetchFetching,
        refetch
    } = useEditInfoQuery({username: safeSlug, isAdminFetch: true})

    const initialValues: AdminUserFormTypes = {
        avatar: data?.avatar || '',
        email: data?.email || '',
        password: '',
        role: data?.role || ''
    }

    const [updateUser, {isLoading: updateLoading, isError: isUpdateError, error: updateError}] = useUpdateUserMutation()

    const handleSubmit = async (values: AdminUserFormTypes, actions: FormikHelpers<AdminUserFormTypes>) => {
        const sendedData = {
            email: values.email,
            avatar: values.avatar,
            role: values.role,
            password: (values.password).trim() !== "" ? (values.password).trim() : null
        }
        const results = await updateUser({userId: data?.id, updateData: sendedData, isAdminAction: true}).unwrap()
        if (results) {
            toast.success(results.message)
            actions.resetForm()
            navigate("/admin/users")
        }
    }

    useEffect(() => {
        refetch()
    }, [refetch]);

    if (fetchLoading || fetchFetching) {
        return <Loader/>
    }

    if (isFetchError) {
        const errType = fetchError as FetchBaseQueryError

        if (errType.status === 401 || errType.status === 404) {
            const errMsg = (errType?.data as { error?: string })?.error || "Something goes wrong"
            toast.error(errMsg)
            navigate("/admin/users")
        }
    }

    if (isUpdateError) {
        const errType = updateError as FetchBaseQueryError

        if (errType.status === 401 || errType.status === 404) {
            const errMsg = (errType?.data as { error?: string })?.error || "Something goes wrong"
            toast.error(errMsg)
        }
    }

    return (
        <section className="admin-user-update-section">
            <div className="wrapper">
                <Formik initialValues={initialValues} onSubmit={handleSubmit} enableReinitialize
                        validationSchema={adminUpdateUserValidation}>
                    {({values, setFieldValue, touched, errors}) => (
                        <Form className="admin-user-form">
                            <div className="admin-user-form-avatar-section">
                                <Upload type="image" setProgress={setProgress} setData={(imageUrl) => {
                                    setFieldValue('avatar', imageUrl)
                                }}>
                                    <Image src={values.avatar} alt="avatar" height="150" width="150"/>
                                    <button
                                        type="button"
                                        className="change-image-btn"
                                    >
                                        <CiEdit size={40} fill="#ffffff"/>
                                    </button>
                                </Upload>
                            </div>
                            <div className="progress-wrapper">
                                <div style={{width: `${progress}%`}}></div>
                            </div>
                            <div className="admin-user-form-input-section">
                                <CustomInput name="email" type="email" placeholder="Enter user email" isRequired/>
                                <CustomInput name="password" type="password" placeholder="Enter user password"
                                             isRequired/>
                                <div className="button-select-wrapper">
                                    <div className="select-wrapper">
                                        <select name="role" value={values.role}
                                                onChange={(e) => setFieldValue('role', e.target.value)}>
                                            <option value="">Select a User Role</option>
                                            <option value="user">User</option>
                                            <option value="admin">Admin</option>
                                        </select>
                                        {(touched.role && errors.role) && (
                                            <span className="input-error-message">{errors.role}</span>
                                        )}
                                    </div>
                                    <div className="button-wrapper">
                                        <Button type="danger" onClick={() => navigate(-1)}>Cancel</Button>
                                        <Button htmlType="submit" loading={updateLoading}>Update</Button>
                                    </div>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </section>
    );
};

export default UpdateUserPage;
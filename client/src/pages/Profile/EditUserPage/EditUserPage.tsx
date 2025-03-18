import './EditUserPage.scss'
import Container from "../../../components/UI/Container.tsx";
import {Form, Formik} from "formik";
import Image from "../../../components/UI/Image.tsx";
import CustomInput from "../../../components/Inputs/CustomInput/CustomInput.tsx";
import Button from "../../../components/UI/Button.tsx";
import {CiEdit} from "react-icons/ci";
import {updateUserValidation} from "../../../validations/userValidations.ts";
import {Navigate, useNavigate, useParams} from "react-router";
import {useAuth} from "../../../context/AuthContext.tsx";
import CustomTextarea from "../../../components/Inputs/CustomInput/CustomTextarea.tsx";
import {useEditInfoQuery, useUpdateUserMutation} from "../../../services/userService.ts";
import Loader from "../../../components/UI/Loader.tsx";
import {UpdateUserTypes} from "../../../types.ts";
import {toast} from "react-toastify";
import Upload from "../../../components/UI/Upload.tsx";
import {useState} from "react";

interface UserFormValuesTypes {
    email: string
    password: string
    bio: string
    avatar?: string
}

const EditUserPage = () => {

    const navigate = useNavigate()
    const {user} = useAuth()
    const {slug} = useParams()
    const [progress, setProgress] = useState<number>(0)

    const safeSlug = slug ?? ""
    const {data: editInfo, isLoading, isError, isFetching} = useEditInfoQuery({username: safeSlug, isAdminFetch: false})
    const [updateUser, {isLoading: editLoading, isError: editError, error}] = useUpdateUserMutation()

    const initialState = {
        email: editInfo?.email || "",
        password: "",
        bio: editInfo?.bio || "",
        avatar: editInfo?.avatar || ""
    }

    const handleSubmit = async (values: UserFormValuesTypes) => {
        const data: UpdateUserTypes = {
            email: values.email,
            bio: values.bio,
            avatar: values.avatar,
            password: values.password !== "" ? values.password : null
        }

        const result = await updateUser({userId: editInfo?.id, updateData: data, isAdminAction: false}).unwrap()

        if (result) {
            toast.success(result.message)
            window.location.href = `/profile/${user?.username}`
        }

    }

    if(editError) {
        console.log(error)
    }

    if (isLoading || isFetching) {
        return <Loader/>
    }

    if (user?.id !== editInfo?.id || isError) {
        return <Navigate to="/" replace/>
    }

    return (
        <section className="edit-user-section">
            <Container>
                <div className="edit-user-wrapper">
                    <Formik initialValues={initialState} onSubmit={handleSubmit} validationSchema={updateUserValidation}
                            enableReinitialize>
                        {({values, setFieldValue}) => (
                            <Form className="edit-user-form">
                                <div className="avatar-wrapper">
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
                                <div className="inputs-wrapper">
                                    <CustomInput type="email" name="email" placeholder="Email" isRequired/>
                                    <CustomTextarea name="bio" placeholder="Biography (Optional)" rows={8}/>
                                    <CustomInput type="password" name="password" placeholder="Password"/>
                                </div>
                                <div className="button-wrapper">
                                    <Button onClick={() => navigate(-1)} htmlType="button" type="danger">Cancel</Button>
                                    <Button loading={editLoading ||(0 < progress && progress < 100)} htmlType="submit">Update</Button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </Container>
        </section>
    );
};

export default EditUserPage;
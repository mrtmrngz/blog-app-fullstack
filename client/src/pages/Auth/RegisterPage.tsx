import AuthForm from "../../components/Auth/AuthForm.tsx";
import {RegisterProps} from "../../types.ts";
import {FormikHelpers} from "formik";
import {useState} from "react";
import {AxiosError} from "axios";
import apiRequest from "../../libs/apiRequest.ts";
import {useNavigate} from "react-router";
import {toast} from "react-toastify";

const RegisterPage = () => {

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate()

    const initialValues = {
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
        pwdVerify: ""
    }

    const handleSubmit = async (values: RegisterProps, actions: FormikHelpers<RegisterProps>) => {
        setIsLoading(true)
        const data = {
            firstName: values.firstName,
            lastName: values.lastName,
            username: values.username,
            email: values.email,
            password: values.password,
        }
        try {
            const response = await apiRequest.post('/auth/register', data)
            toast.success(response?.data?.message)
            navigate("/auth/login")
            actions.resetForm()
        }catch (err) {
            const resError = err as AxiosError<{error: string}>

            if(resError.response?.status === 404 || resError.response?.status === 403) {
                setError(resError.response?.data.error)
            }
        }finally {
            setIsLoading(false)
        }
    }

    return <AuthForm handleSubmit={handleSubmit} initialValues={initialValues} isLoading={isLoading} error={error} />
};

export default RegisterPage;
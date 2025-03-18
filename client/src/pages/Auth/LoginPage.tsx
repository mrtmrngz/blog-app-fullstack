import AuthForm from "../../components/Auth/AuthForm.tsx";
import {LoginProps} from "../../types.ts";
import {FormikHelpers} from "formik";
import {useState} from "react";
import apiRequest from "../../libs/apiRequest.ts";
import {useAuth} from "../../context/AuthContext.tsx";
import {AxiosError} from "axios";
import {toast} from "react-toastify";

const LoginPage = () => {

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    const {setUser, setToken} = useAuth()

    const initialValues = {
        email: "",
        password: ""
    }

    const handleSubmit = async (values: LoginProps, actions: FormikHelpers<LoginProps>) => {
        setIsLoading(true)
        setError(null)
        try {
            const authResponse = await apiRequest.post('/auth/login', values)
            const {accessToken, message} = authResponse.data

            if(accessToken) {
                setToken(accessToken)
                apiRequest.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`
                const userResponse = await apiRequest.get('/users/user-info')
                setUser(userResponse.data)
                toast.success(message)
                actions.resetForm()
                window.location.href = "/"
            }
        }catch (err) {
            const resError = err as AxiosError<{error: string}>

            if(resError.response?.status === 404) {
                setError(resError.response?.data.error)
            }
        }finally {
            setIsLoading(false)
        }
    }

    return <AuthForm handleSubmit={handleSubmit} initialValues={initialValues} isLogin isLoading={isLoading} error={error} />
};

export default LoginPage;
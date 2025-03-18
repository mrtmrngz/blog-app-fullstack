import {Form, Formik, FormikHelpers} from "formik";
import CustomInput from "../Inputs/CustomInput/CustomInput.tsx";
import Button from "../UI/Button.tsx";
import {Link} from "react-router";
import {LoginProps, RegisterProps} from "../../types.ts";
import {useState} from "react";
import {loginValidation, registerValidation} from "../../validations/userValidations.ts";
import './AuthForm.scss'

interface LoginFormProps {
    handleSubmit: (values: LoginProps, actions: FormikHelpers<LoginProps>) => void
    initialValues: LoginProps
    isLogin: true
}

interface RegisterFormProps {
    handleSubmit: (values: RegisterProps, actions: FormikHelpers<RegisterProps>) => void
    initialValues: RegisterProps
    isLogin?: false
}

type AuthFormProps = {
    isLoading: boolean
    error: string | null
} & (LoginFormProps | RegisterFormProps)

const AuthForm = ({initialValues, handleSubmit, isLogin, error, isLoading}: AuthFormProps) => {

    const [validationSchema] = useState(isLogin ? loginValidation : registerValidation)

    return (
        <div className="auth-form-wrapper">
            {error && (
                <div className="error-wrapper">
                    <p>{error}</p>
                </div>
            )}
            <div className="form-wrapper">
                <h1 className="auth-form-title">{isLogin ? "Login" : "Register"}</h1>
                <Formik validationSchema={validationSchema} initialValues={initialValues} onSubmit={(values, actions) => {
                    if(isLogin) {
                        handleSubmit(values as LoginProps, actions as FormikHelpers<LoginProps>)
                    }else {
                        handleSubmit(values as RegisterProps, actions as FormikHelpers<RegisterProps>)
                    }
                }}>
                    {() => (
                        <Form className="auth-form">
                            {!isLogin && (
                                <div className="auth-full-name-wrapper">
                                    <CustomInput type="text" name="firstName" placeholder="Enter Firstname" isRequired />
                                    <CustomInput type="text" name="lastName" placeholder="Enter Lastname" isRequired />
                                </div>
                            )}
                            {!isLogin && (
                                <CustomInput type="text" name="username" placeholder="Enter Username" isRequired />
                            )}
                            <CustomInput type="email" name="email" placeholder="Enter Email" isRequired />
                            <CustomInput type="password" name="password" placeholder="Enter Password" isRequired />
                            {!isLogin && (<CustomInput type="password" name="pwdVerify" placeholder="Enter Password Again" isRequired />)}
                            <div className="button-wrapper">
                                {isLogin ? (
                                    <span className="navigate-badge">Don't you have any account? <Link to="/auth/register">Register Now!</Link> </span>
                                ): (
                                    <span className="navigate-badge">Do you have account? <Link to="/auth/login">Login Now!</Link> </span>
                                )}
                                <Button loading={isLoading} htmlType="submit">{isLogin ? "Login" : "Register"}</Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default AuthForm;
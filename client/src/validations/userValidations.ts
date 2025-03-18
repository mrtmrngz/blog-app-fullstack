import * as yup from 'yup'

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/

export const updateUserValidation = yup.object().shape({
    email: yup.string()
        .email("Please enter a valid email!")
        .required('Email field is require!'),
    password: yup.string()
        .min(8, "Password field must be at least 8 character")
        .matches(passwordRules, {
            message: "The password field must contain at least one uppercase letter, one lowercase letter, and one number."
        }).notRequired(),
    bio: yup.string()
        .min(25, "Biography must be at least 25 characters")
        .max(500, "Biography must be at most 500 characters")
        .notRequired()
})

export const registerValidation = yup.object().shape({
    firstName: yup.string().min(3, "Firstname must be at least 3 characters!").required("Firstname field are required"),
    lastName: yup.string().min(3, "Lastname must be at least 3 characters!").required("Lastname field are required"),
    username: yup.string().min(5, "Username field must be at least 5 characters!").required("Username field are required"),
    email: yup.string()
        .email("Please enter a valid email!")
        .required('Email field is require!'),
    password: yup.string()
        .min(8, "Password field must be at least 8 character")
        .matches(passwordRules, {
            message: "The password field must contain at least one uppercase letter, one lowercase letter, and one number."
        }).required("Password field is required"),
    pwdVerify: yup.string()
        .oneOf([yup.ref('password')], "Passwords are not match")
        .required('Password verification is required!')
})

export const loginValidation = yup.object().shape({
    email: yup.string()
        .email("Please enter a valid email!")
        .required('Email field is require!'),
    password: yup.string()
        .min(8, "Password field must be at least 8 character")
        .matches(passwordRules, {
            message: "The password field must contain at least one uppercase letter, one lowercase letter, and one number."
        }).required("Password field is required"),
})

export const adminUpdateUserValidation = yup.object().shape({
    email: yup.string()
        .email("Please enter a valid email!")
        .required('Email field is require!'),
    password: yup.string()
        .min(8, "Password field must be at least 8 character")
        .matches(passwordRules, {
            message: "The password field must contain at least one uppercase letter, one lowercase letter, and one number."
        }).notRequired(),
    role: yup.string()
        .oneOf(['user', 'admin'], 'User role must be admin or user')
        .required('Role is required')
})
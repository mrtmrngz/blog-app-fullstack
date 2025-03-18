import {useField} from "formik";
import React from "react";
import './CustomInput.scss'

interface CustomTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement>{
    isRequired?: true
}

const CustomInput = ({isRequired, ...props}: CustomTextareaProps) => {

    const [field, meta] = useField({name: props.name!})

    return (
        <div className="custom-input-group">
            <textarea id={props?.name} {...props} {...field} placeholder={`${props?.placeholder} ${isRequired ? "(Required)" : ""}`} />
            {(meta.touched && meta.error) && (
                <span className="input-error-message">{meta.error}</span>
            )}
        </div>
    );
};

export default CustomInput;
import {useField} from "formik";
import React from "react";
import './CustomInput.scss'

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement>{
    isRequired?: true
}

const CustomInput = ({isRequired, ...props}: CustomInputProps) => {

    const [field, meta] = useField({name: props.name!})

    return (
        <div className="custom-input-group">
            <input id={props?.name} {...props} {...field} placeholder={`${props?.placeholder} ${isRequired ? "(Required)" : ""}`} />
            {(meta.touched && meta.error) && (
                <span className="input-error-message">{meta.error}</span>
            )}
        </div>
    );
};

export default CustomInput;
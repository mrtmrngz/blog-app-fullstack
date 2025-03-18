import {ReactNode} from "react";


interface ButtonInterface {
    children: ReactNode
    className?: string
    htmlType?: "button" | "submit" | "reset"
    type?: 'primary' | 'secondary' | 'accent' | 'danger' | 'dark' | 'link'
    size?: 'sm' | 'normal' | 'lg'
    loading?: boolean
    onClick?: () => void
}

const Button = ({children, className, onClick, htmlType='button', type='primary', size='normal', loading}: ButtonInterface) => {
    return <button disabled={loading} onClick={onClick} type={htmlType} className={`btn ${type} ${className ? className : ""} ${size} ${loading ? "disabled-button" : ""}`}>{children}</button>
};

export default Button;
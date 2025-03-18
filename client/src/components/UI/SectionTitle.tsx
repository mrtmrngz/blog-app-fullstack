import {ReactNode} from "react";

interface SectionTitleProps {
    children: ReactNode
    className?: string
}

const SectionTitle = ({children, className} : SectionTitleProps) => {
    return <h2 className={`section-title ${className ? className : ""}`}>{children}</h2>
};

export default SectionTitle;
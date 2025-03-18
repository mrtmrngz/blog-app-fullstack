import {ReactNode} from "react";

interface ContainerInterface {
    children: ReactNode
    className?: string
}

const Container = ({children, className}: ContainerInterface) => {
    return (
        <div className={`container ${className ? className : ""}`}>{children}</div>
    );
};

export default Container;
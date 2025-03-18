import {ScaleLoader} from "react-spinners";

const Loader = () => {
    return (
        <div className="loader-wrapper">
            <ScaleLoader width={10} height={40} />
        </div>
    );
};

export default Loader;
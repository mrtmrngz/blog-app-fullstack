

interface BackdropProps {
    onOpen: boolean
    onClose: () => void
}

const Backdrop = ({onOpen, onClose}: BackdropProps) => {
    return (
        <div onClick={onClose} className={`backdrop ${onOpen ? "open" : ""}`} />
    );
};

export default Backdrop;
import './AlertModal.scss'
import Backdrop from "../Backdrop.tsx";
import Image from "../Image.tsx";
import Button from "../Button.tsx";
import {RefObject} from "react";

interface AlertModalProps {
    onOpen: boolean
    onClose: () => void
    alertMessage: string
    submitButtonText: string
    submit: () => void | Promise<void>
    modalRef: RefObject<HTMLDivElement>
}

const AlertModal = ({onOpen, onClose, alertMessage, submitButtonText, submit, modalRef}: AlertModalProps) => {

    return (
        <dialog open className="alert-modal">
            <Backdrop onOpen={onOpen} onClose={onClose} />
            <div className="modal-wrapper" ref={modalRef}>
                <header className="modal-header">
                    <div className="alert-image">
                        <Image src="alert.png" alt="alert-icon" width="150" />
                    </div>
                    <h3>Alert!</h3>
                </header>
                <div className="modal-content">
                    <p className="alert-message">{alertMessage}</p>
                    <div className="button-wrapper">
                        <Button onClick={onClose} type="danger">Cancel</Button>
                        <Button onClick={submit} type="primary">{submitButtonText}</Button>
                    </div>
                </div>
            </div>
        </dialog>
    );
};

export default AlertModal;
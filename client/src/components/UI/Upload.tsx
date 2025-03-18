import {ReactNode, useRef} from "react";
import {IKContext, IKUpload} from "imagekitio-react";
import {toast} from "react-toastify";

const authenticator =  async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/upload-auth`);

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Request failed with status ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        const { signature, expire, token } = data;
        return { signature, expire, token };
    } catch (error) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        throw new Error(`Authentication request failed: ${error.message}`);
    }
};

interface UploadProps {
    children: ReactNode;
    type?: string
    setProgress?: (res: number) => void
    setData: (res: string) => void
}

const Upload = ({children, type, setProgress, setData}: UploadProps) => {

    const ref = useRef<HTMLInputElement | null>(null)

    const onError = (err: unknown) => {
        console.error(err);
        toast.error("Image upload error");
    };

    const onSuccess = (res: { name: string }) => {
        setData(res.name);
    };

    const onUploadProgress = (progressEvent: ProgressEvent) => {
        if (setProgress) {
            const percentCompleted = Math.round((progressEvent.loaded / progressEvent.total) * 100);
            setProgress(percentCompleted);
        }
    };

    return (
        <IKContext publicKey={import.meta.env.VITE_IK_IMAGE_PUBLIC} urlEndpoint={import.meta.env.VITE_IK_IMAGE_URL} authenticator={authenticator}>
            <IKUpload
                useUniqueFileName
                onError={onError}
                folder="/blog-app"
                onSuccess={onSuccess}
                onUploadProgress={onUploadProgress}
                ref={ref}
                className="hidden-upload"
                accept={`${type}/*`}
            />
            <div style={{cursor: "pointer"}} onClick={() => ref?.current?.click()}>{children}</div>
        </IKContext>
    )

}

export default Upload
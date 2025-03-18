import {IKImage} from "imagekitio-react";

interface ImageProps {
    src: string
    className?: string
    alt: string
    width?: string
    height?: string
}

const Image = ({src, className, width, height, alt}: ImageProps) => {
    return (
        <IKImage
            urlEndpoint={import.meta.env.VITE_IK_IMAGE_URL}
            path={src}
            className={className}
            alt={alt}
            height={height}
            width={width}
            loading='lazy'
            lqip={{active: true, quality: 20}}
            transformation={[
                {
                    width: width,
                    height: height
                }
            ]}
        />
    );
};

export default Image;
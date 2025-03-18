import ImageKit from "imagekit";

const imageKit = new ImageKit({
    urlEndpoint: process.env.IK_IMAGE_URL,
    publicKey: process.env.IK_IMAGE_PUBLIC,
    privateKey: process.env.IK_IMAGE_PRIVATE
})

export const upload_auth = async (req, res) => {
    const result = imageKit.getAuthenticationParameters()
    res.send(result)
}
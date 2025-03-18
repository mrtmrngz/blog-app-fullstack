import Container from "../../UI/Container.tsx";
import {Form, Formik} from "formik";
import ReactQuill from "react-quill-new";
import {MdOutlineFileUpload} from "react-icons/md";
import Button from "../../UI/Button.tsx";
import {useNavigate} from "react-router";
import {BlogFormProps, CategoryTypes} from "../../../types.ts";
import {blogValidation} from "../../../validations/BlogValidation.ts";
import 'react-quill-new/dist/quill.snow.css';
import './BlogForm.scss'
import Upload from "../../UI/Upload.tsx";
import {useAllCategoriesQuery} from "../../../services/categoryService.ts";
import Loader from "../../UI/Loader.tsx";
import {useEffect, useState} from "react";
import CustomInput from "../../Inputs/CustomInput/CustomInput.tsx";

const BlogForm = ({values, onSubmit, isEdit, actionLoading, handleDelete, isAdmin = false}: BlogFormProps) => {

    const navigate = useNavigate()
    const {data, isLoading, isFetching, error, isError, refetch} = useAllCategoriesQuery(undefined)
    const [progress, setProgress] = useState<number>(0)

    useEffect(() => {
        refetch()
    }, [refetch]);

    if (isError) {
        console.log(error)
    }

    if (isLoading || isFetching) {
        return <Loader/>
    }

    const FormContent = (
        <Formik initialValues={values} onSubmit={(values, actions) => {
            onSubmit(values, actions)
        }} enableReinitialize validationSchema={blogValidation(data)}>
            {({values, setFieldValue, touched, errors}) => (
                <Form className="blog-form">
                    <CustomInput type="text" name="title" placeholder="Enter Blog Title" isRequired/>
                    <div className="input-group">
                        <textarea value={values.description}
                                  onChange={(event) => setFieldValue('description', event.target.value)} required
                                  name="description" rows={8} placeholder="DESCRIPTION" maxLength={500}/>
                        {(touched.description && errors.description) && (
                            <span className="input-error-message">{errors.description}</span>
                        )}
                    </div>
                    <Upload setProgress={setProgress} setData={(imageUrl) => {
                        setFieldValue('image', imageUrl)
                    }}>
                        <button name="image" type="button" aria-label="banner-button" title="Upload Image"
                                className="banner-btn">
                            <MdOutlineFileUpload size={30}/>
                            <span className="upload-image-badge">Upload Image</span>
                        </button>
                    </Upload>
                    <div className="progress-wrapper">
                        <div style={{width: `${progress}%`}}></div>
                    </div>
                    <div className="quill-wrapper">
                        <ReactQuill theme="snow" placeholder="BLOG CONTENT" value={values.content}
                                    onChange={(content) => setFieldValue('content', content)}/>
                        {(touched.content && errors.content) && (
                            <span className="input-error-message">{errors.content}</span>
                        )}
                    </div>
                    <div className="button-select-wrapper">
                        <div className="select-wrapper">
                            <select value={values.categoryId}
                                    onChange={(event) => setFieldValue('categoryId', event.target.value)}
                                    name="categoryId" className="category-select">
                                <option value="">Select a Category</option>
                                {data.map((category: CategoryTypes) => (
                                    <option key={category?.id} value={category?.id}>{category?.title}</option>
                                ))}
                            </select>
                            {(touched.categoryId && errors.categoryId) && (
                                <span className="input-error-message">{errors.categoryId}</span>
                            )}
                        </div>
                        <div className="button-wrapper">
                            <Button onClick={() => navigate(-1)} htmlType="button"
                                    type={isEdit ? "accent" : "danger"}>Cancel</Button>
                            {isEdit && (
                                <Button onClick={handleDelete} htmlType="button" type="danger">Delete</Button>
                            )}
                            <Button loading={actionLoading || (0 < progress && progress < 100)} htmlType="submit"
                                    type="primary">Submit</Button>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    )

    return !isAdmin ? (
        <section className="blog-form-section">
            <Container>
                <div className="blog-form-wrapper">
                    <h1 className="blog-form-title">{isEdit ? "Edit Blog" : "Add New Blog"}</h1>
                    <div className="form-wrapper">
                        {FormContent}
                    </div>
                </div>
            </Container>
        </section>
    ): (
        <section className="admin-blog-form-section">
            <div className="wrapper">
                {FormContent}
            </div>
        </section>
    )
};

export default BlogForm;
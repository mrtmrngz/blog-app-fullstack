import * as yup from 'yup'
import {CategoryTypes} from "../types.ts";

export const blogValidation = (categories: CategoryTypes[]) => yup.object().shape({
    title: yup.string()
        .max(255, "Title length can't be longer than 255 characters!").required('Title area is required!'),
    description: yup.string()
        .max(500, "Description length can't be longer than 500 characters!").required('Description area is required!'),
    content: yup.string().test(
        "content-required",
        "Blog content is required!",
        (value) => Boolean(value && value.replace(/<(.|\n)*?>/g, "").trim().length > 0)
    ),
    image: yup.string().required('Image Field Is Required'),
    categoryId: yup.string().oneOf(categories.map((category: CategoryTypes) => category.id), "Please select a valid category").required('Category field is required')
})
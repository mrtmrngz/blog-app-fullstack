import {FormikHelpers} from "formik";
import {ReactNode} from "react";

export interface FeaturedBlogTypes {
    id: string | number
    title: string
    description: string
    categoryId: string
    category: {
        id: string
        slug: string
        title: string
    }
    image: string
    content: string
    slug: string
    likes: {userId: string; blogId: string}[]
    readerCount: number
    createdAt: string
    updatedAt: string
}

export interface CategoryTypes {
    id: string
    slug: string
    category: string
}

export interface BlogTypesWithoutIds {
    title: string
    description: string,
    content: string
    image: string
    categoryId: string
}

export interface BlogFormProps {
    values: BlogTypesWithoutIds
    isEdit?: true
    onSubmit: (values: BlogTypesWithoutIds, actions: FormikHelpers<BlogTypesWithoutIds>) => void | Promise<void>
    actionLoading: boolean
    handleDelete?: () => Promise<void>
    isAdmin?: boolean
}

export interface LoginProps {
    email: string
    password: string
}

export interface RegisterProps extends LoginProps{
    firstName: string
    lastName: string
    username: string
    pwdVerify: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface CustomTableData<T=any> {
    key: string
    className: string
    label: string
    width?: string
    render: (item: T) => ReactNode
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface CustomTableProps<T=any> {
    tableKey: string
    tableClass?: string
    data: T[]
    columns: CustomTableData<T>[]
}

export interface AdminUserListTypes {
    id: string
    firstName: string
    lastName: string
    username: string
    email: string
    avatar: string
    role: 'admin' | 'user'
    createdAt: string
}

export interface UserTypes extends AdminUserListTypes{
    bio: string
    _count: {
        follower: number
        following: number
    }
    updatedAt: string
}

export interface UpdateUserTypes {
    email: string
    bio: string
    avatar?: string
    password: string | null
}

export interface AdminUpdateUserTypes {
    email: string,
    password: string | null
    avatar?: string
    role: string
}

export interface CategoryTypes {
    id: string
    title: string
    slug: string
    createdAt: string
    updatedAt: string
}

export interface LikesType {
    blogId: string;
    userId: string
}

export interface FetchBlogInterface {
    id: string
    title: string
    slug: string
    image: string
    description: string
    content: string
    categoryId: string
    authorId: string
    category: {
        id: string
        title: string
        slug: string
    }
    author: {
        id: string
        avatar: string
        firstName: string
        lastName: string
        username: string
    }
    likes: LikesType[],
    readerCount: number
    createdAt: string
    updatedAt: string
}

export interface CommentInterface {
    id: string;
    comment: string;
    review: number;
    blogId: string;
    user: {
        id: string
        avatar: string
        firstName: string
        lastName: string
        username: string
    };
    createdAt: string
}

export interface ProfileBlogTypes {
    id: string
    title: string
    slug: string
    image: string
    description: string
    content: string
    categoryId: string
    authorId: string
    author: {
        id: string
        firstName: string
        lastName: string
    }
    createdAt: string
    updatedAt: string
}
import {apiService} from "./apiService.ts";
import {BlogTypesWithoutIds} from "../types.ts";


const blogService = apiService.injectEndpoints({
    endpoints: builder => ({
        getBlogs: builder.query({
            query: ({page, limit, sort}: {page: number, limit: number, sort?: { cat?: string; search?: string; sort?: string }}) => ({
                url: `/blogs?page=${page}&limit=${limit}&cat=${sort?.cat}&sort=${sort?.sort}&search=${sort?.search}`,
                method: "GET"
            })
        }),
        featured: builder.query({
            query: () => ({
                url: `/blogs/featured`,
                method: "GET"
            })
        }),
        mostReaded: builder.query({
            query: () => ({
                url: `/blogs/most-readed`,
                method: "GET"
            })
        }),
        mostLiked: builder.query({
            query: () => ({
                url: `/blogs/most-liked`,
                method: "GET"
            })
        }),
        blogDetail: builder.query({
            query: ({slug}: { slug: string }) => ({
                url: `/blogs/${slug}`,
                method: "GET"
            })
        }),
        likeBlog: builder.mutation({
            query: ({blogId}: { blogId: string }) => ({
                url: `/blogs/like/${blogId}`,
                method: "POST"
            })
        }),
        deleteBlog: builder.mutation({
            query: ({blogId, isAdminAction=false}: { blogId: string, isAdminAction?:boolean }) => ({
                url: isAdminAction ? `/admin/blogs/${blogId}` : `/blogs/${blogId}`,
                method: "DELETE"
            })
        }),
        profileBlogs: builder.query({
            query: (slug: string) => `/profile/blogs/${slug}`
        }),
        likedBlogs: builder.query({
            query: (slug: string) => `/profile/liked-blogs/${slug}`
        }),
        addBlog: builder.mutation({
            query: ({data, isAdminAction=false}: {data: BlogTypesWithoutIds, isAdminAction: boolean}) => ({
                url: isAdminAction ? `/admin/blogs` : `/blogs`,
                method: "POST",
                body: {...data}
            })
        }),
        updateBlogFetch: builder.query({
            query: ({slug, isAdminAction=false}: {slug: string, isAdminAction?: boolean}) => isAdminAction ? `/admin/blogs/${slug}` : `/blogs/update-fetch/${slug}`
        }),
        updateBlog: builder.mutation({
            query: ({id, data, isAdminAction=false}: {id: string, data: BlogTypesWithoutIds, isAdminAction?:boolean}) => ({
                url: isAdminAction ? `/admin/blogs/${id}` : `/blogs/${id}`,
                method: "PUT",
                body: {...data}
            })
        })
    })
})

export const {
    useGetBlogsQuery,
    useLazyGetBlogsQuery,
    useFeaturedQuery,
    useMostReadedQuery,
    useMostLikedQuery,
    useBlogDetailQuery,
    useLikeBlogMutation,
    useDeleteBlogMutation,
    useProfileBlogsQuery,
    useLikedBlogsQuery,
    useAddBlogMutation,
    useUpdateBlogFetchQuery,
    useUpdateBlogMutation,
} = blogService
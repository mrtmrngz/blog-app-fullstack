import {apiService} from "../apiService.ts";

const blogService = apiService.injectEndpoints({
    endpoints: builder => ({
        fetchAllBlogs: builder.query({
            query: () => `/admin/blogs`
        })
    })
})

export const {useFetchAllBlogsQuery} = blogService
import {apiService} from "../apiService.ts";


const categoryService = apiService.injectEndpoints({
    endpoints: builder => ({
        createCategory: builder.mutation({
            query: (data: { title: string }) => ({
                url: `/admin/categories`,
                method: "POST",
                body: data
            })
        }),
        fetchCategories: builder.query({
            query: () => `/admin/categories`
        }),
        fetchSingleCategory: builder.query({
            query: (slug: string) => `/admin/categories/${slug}`
        }),
        updateCategory: builder.mutation({
            query: ({slug, title}: { slug: string, title: string }) => ({
                url: `/admin/categories/${slug}`,
                method: "PUT",
                body: {title}
            })
        }),
        deleteCategory: builder.mutation({
            query: (id: string) => ({
                url: `/admin/categories/${id}`,
                method: "DELETE"
            })
        })
    })
})

export const {
    useCreateCategoryMutation,
    useFetchCategoriesQuery,
    useFetchSingleCategoryQuery,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation
} = categoryService
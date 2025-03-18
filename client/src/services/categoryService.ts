import {apiService} from "./apiService.ts";


const categoryService = apiService.injectEndpoints({
    endpoints: builder => ({
        allCategories: builder.query({
            query: () => `/categories`
        }),
        homeCategories: builder.query({
            query: () => `/categories/home`
        }),
        footerCategories: builder.query({
            query: () => `/categories/footer`
        })
    })
})

export const {useHomeCategoriesQuery, useFooterCategoriesQuery, useAllCategoriesQuery} = categoryService
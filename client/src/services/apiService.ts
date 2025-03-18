import {fetchBaseQuery, createApi, FetchArgs, BaseQueryApi, FetchBaseQueryError} from '@reduxjs/toolkit/query/react'
import apiRequest from "../libs/apiRequest.ts";

const baseQuery = fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}/api`,
    credentials: 'include',
    prepareHeaders: (headers) => {
        const authHeader = apiRequest.defaults.headers.common["Authorization"]

        if(typeof authHeader === 'string' && authHeader.startsWith("Bearer ")) {
            const token = authHeader.split(' ')[1]
            headers.set('Authorization', `Bearer ${token}`)
        }

        return headers
    }
})

const baseQueryWithReauth = async (args: string | FetchArgs, api: BaseQueryApi, extraOptions: object) => {
    const result = await baseQuery(args, api, extraOptions)

    if ((result as { error?: FetchBaseQueryError })?.error?.status === 401) {
        window.location.href = "/auth/login";
    }

    return result
}

export const apiService = createApi({
    reducerPath: 'apiService',
    baseQuery: baseQueryWithReauth,
    endpoints: () => ({})
})
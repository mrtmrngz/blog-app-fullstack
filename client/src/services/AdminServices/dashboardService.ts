import {apiService} from "../apiService.ts";


const dashboardService = apiService.injectEndpoints({
    endpoints: builder => ({
        dashboard: builder.query({
            query: () => `/admin/dashboard`
        })
    })
})

export const {useDashboardQuery} = dashboardService
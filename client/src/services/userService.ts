import {apiService} from "./apiService.ts";
import {AdminUpdateUserTypes, UpdateUserTypes} from "../types.ts";

const profileService = apiService.injectEndpoints({
    endpoints: builder => ({
        profileInfo: builder.query({
            query: (slug: string) => ({
                url: `/profile/${slug}`,
                method: "GET"
            })
        }),
        followService: builder.mutation({
            query: (userId: number) => ({
                url: `/users/follow-user/${userId}`,
                method: "POST"
            })
        }),
        editInfo: builder.query({
            query: ({username, isAdminFetch=false} : {username:string, isAdminFetch?: boolean}) => ({
                url: isAdminFetch ? `/admin/users/${username}` : `/users/user-info-edit/${username}`,
                method: "GET"
            })
        }),
        updateUser: builder.mutation({
            query: ({ userId, updateData, isAdminAction=false }: { userId: string; updateData: UpdateUserTypes | AdminUpdateUserTypes, isAdminAction?:boolean }) => ({
                url: isAdminAction ? `/admin/users/${userId}` : `/users/update-user/${userId}`,
                method: "PUT",
                body: updateData
            })
        }),
        adminUserList: builder.query({
            query: () => `/admin/users`
        }),
        deleteUser: builder.mutation({
            query: (userId: string) => ({
                url: `/admin/users/${userId}`,
                method: "DELETE"
            })
        })
    })
})

export const {useProfileInfoQuery, useFollowServiceMutation, useEditInfoQuery, useUpdateUserMutation, useAdminUserListQuery, useDeleteUserMutation} = profileService
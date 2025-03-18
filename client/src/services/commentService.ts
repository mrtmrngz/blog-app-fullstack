import {apiService} from "./apiService.ts";


const commentService = apiService.injectEndpoints({
    endpoints: builder => ({
        addComment: builder.mutation({
            query: (commentData: {comment: string; review: number, blogId: string}) => ({
                url: `/comments`,
                method: "POST",
                body: {...commentData}
            })
        }),
        deleteComment: builder.mutation({
            query: (commentId: string) => ({
                url: `/comments/${commentId}`,
                method: "DELETE"
            })
        })
    })
})

export const {useAddCommentMutation, useDeleteCommentMutation} = commentService
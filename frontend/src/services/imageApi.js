import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./utils";
export const imageApi = createApi({
    reducerPath: "imageApi",
    baseQuery,
    tagTypes: ['Images'],
    endpoints: builder => ({
        getImages: builder.query({
            query: query => `images?search=${query}`,
            providesTags: (result, error, query) => [{ type: 'Images', id: 'LIST' }],
        }),
        createImage: builder.mutation({
            query: data => ({
                url: "images",
                method: "POST",
                body: data,
            }),
            invalidatesTags: [{ type: 'Images', id: 'LIST' }],
        }),
        incViews: builder.mutation({
            query: ({ id }) => ({
                url: `images/${id}/inc-views`,
                method: "PUT",
            }),
        }),
    }),
});
export const { useGetImagesQuery, useCreateImageMutation, useIncViewsMutation, } = imageApi;

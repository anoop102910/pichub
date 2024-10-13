import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./utils";
import { ImageData } from "@/types";
export const imageApi = createApi({
  reducerPath: "imageApi",
  baseQuery,
  endpoints: builder => ({
    getImages: builder.query<ImageData, string>({
      query: query => `images?search=${query}`,
    }),
    createImage: builder.mutation<ImageData, FormData>({
      query: data => ({
        url: "images",
        method: "POST",
        body: data,
      }),
    }),
    incViews: builder.mutation<ImageData, { id: string }>({
      query: ({ id }) => ({
        url: `images/${id}/inc-views`,
        method: "PUT",
      }),
    }),
  }),
});

export const {
  useGetImagesQuery,
  useCreateImageMutation,
  useIncViewsMutation,
} = imageApi;

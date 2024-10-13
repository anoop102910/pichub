import { fetchBaseQuery } from "@reduxjs/toolkit/query";

export const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:5000/api",
    credentials: "include",
    headers: {
      Authorization: `${
        localStorage.getItem("token") ? `Bearer ${localStorage.getItem("token")}` : ""
      }`,
    },
  });
  
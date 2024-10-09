import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

// Include credentials so cookies (JWT token) are sent with requests
const baseQuery = fetchBaseQuery({
  baseUrl: "",
  credentials: "include", // This ensures cookies are sent with the requests
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["User"],
  endpoints: (builder) => ({}),
});

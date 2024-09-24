import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

// Modify baseQuery to include token from localStorage
const baseQuery = fetchBaseQuery({
  baseUrl: "", // Your API base URL here
  prepareHeaders: (headers, { getState }) => {
    // Retrieve token from localStorage
    const jwt = localStorage.getItem("jwt");

    // If token exists, set it in the Authorization header
    if (jwt) {
      headers.set("Authorization", `Bearer ${jwt}`);
    }

    return headers;
  },
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["User"],
  endpoints: (builder) => ({}),
});

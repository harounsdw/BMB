import { apiSlice } from "./apiSlice";
const USERS_URL = "https://bmb-9bgg.onrender.com/api/users";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          // Dispatch setCredentials with user info and token
          dispatch(setCredentials(data));

          // Optionally, store the token in localStorage
          localStorage.setItem("token", data.token);
        } catch (err) {
          console.error("Login error:", err);
        }
      },
    }),

    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    updateUser: builder.mutation({
      query: (data) => {
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("Token is missing");
        }

        return {
          url: `${USERS_URL}/profile`,
          method: "PUT",
          body: data,
          credentials: "include", // Include cookies with the request if necessary
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Send token in Authorization header
          },
        };
      },
    }),

    updateTotalIncome: builder.mutation({
      query: (totalIncome) => ({
        url: `${USERS_URL}/total`,
        method: "PUT",
        body: { totalIncome },
      }),
    }),
    transferPoints: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/transfer-points`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useUpdateUserMutation,
  useUpdateTotalIncomeMutation,
  useTransferPointsMutation,
} = userApiSlice;

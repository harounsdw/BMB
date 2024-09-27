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
        const token = localStorage.getItem("userInfo")
          ? JSON.parse(localStorage.getItem("userInfo")).token
          : null;

        return {
          url: `${USERS_URL}/profile`,
          method: "PUT",
          body: data,
          headers: {
            Authorization: `Bearer ${token}`, // Send the token in the Authorization header
          },
        };
      },
    }),
    updateTotalIncome: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/total`,
        method: "PUT",
        body: { data },
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

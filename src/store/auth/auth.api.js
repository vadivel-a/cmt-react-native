import { myApi } from '../../api/myApi';
import { ForgotPassword } from '../../screens';

export const authApi = myApi.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: 'auth/login',
                method: 'POST',
                body: { ...credentials },
            }),
        }),
        register: builder.mutation({
            query: credentials => ({
                url: 'auth/register',
                method: 'POST',
                body: { ...credentials },
            }),
        }),
        forgotPassword: builder.mutation({
            query: credentials => ({
                url: 'auth/forgot-password',
                method: 'POST',
                body: { ...credentials },
            }),
        }),
        profile: builder.mutation({
            query: () => ({
                url: 'auth/profile',
                method: 'POST',
            }),
        }),
        profileUpdate: builder.mutation({
            query: data => ({
                url: `user/${data.user_id}`,
                method: 'PUT',
                body: { ...data },
            }),
        }),
        resetPassword: builder.mutation({
            query: data => ({
                url: 'auth/reset-password',
                method: 'POST',
                body: { ...data }, // expect { token, email, password, password_confirmation }
            }),
        }),
        getResetPasswordLink: builder.query({
            query: ({ token, email }) => ({
                url: `reset-password/${token}?email=${encodeURIComponent(email)}`,
                method: 'GET',
            }),
        }),
    }),
});

export const {
    useLoginMutation,
    useRegisterMutation,
    useForgotPasswordMutation,
    useProfileMutation,
    useProfileUpdateMutation,
    useResetPasswordMutation,
    useGetResetPasswordLinkQuery,
} = authApi;

import { myApi } from '../../api/myApi';

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
    }),
});

export const {
    useLoginMutation,
    useRegisterMutation,
    useProfileMutation,
    useProfileUpdateMutation,
} = authApi;

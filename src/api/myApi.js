import { apiSlice } from '../redux/slices/apiSlice';

export const myApi = apiSlice.injectEndpoints({
    reducerPath: 'myApi',
    endpoints: builder => ({
        loginUser: builder.mutation({
            query: credentials => ({
                url: 'auth/login',
                method: 'POST',
                body: { ...credentials }
            })
        }),
        register: builder.mutation({
            query: credentials => ({
                url: 'auth/register',
                method: 'POST',
                body: { ...credentials }
            })
        }),
        profile: builder.mutation({
            query: () => ({
                url: 'auth/profile',
                method: 'POST',
            })
        }),
        profileUpdate: builder.mutation({
            query: data => ({
                url: `user/${data.user_id}`,
                method: 'PUT',
                body: { ...data }
            })
        }),
    })
})

export const {
    useLoginUserMutation,
    useRegisterMutation,
    useProfileMutation,
    useProfileUpdateMutation,
} = myApi;


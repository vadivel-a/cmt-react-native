import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../constants/Config';
import { setCredentials, logOut } from '../store/auth/auth.slice';

const baseQuery = fetchBaseQuery({
  baseUrl: `${API_URL}/api`,
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    headers.set('Accept', 'application/json');
    headers.set('Content-Type', 'application/json');
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  console.log(result);
  const state = api.getState();
  const refreshAt = state.auth.user?.refresh_at;
  const currentTime = Date.now();

  const tokenExpired = refreshAt && currentTime >= refreshAt;
  const unauthorized = result?.error?.status === 401;

  if (tokenExpired || unauthorized) {
    console.log('🔄 Token expired or unauthorized. Attempting to refresh...');

    const refreshResult = await baseQuery(
      {
        url: 'auth/refresh',
        method: 'POST',
        body: {
          token: state.auth.token, // or refreshToken if used
        },
      },
      api,
      extraOptions
    );

    if (refreshResult?.data) {
      const { token } = refreshResult.data;
      const user = state.auth.user;

      api.dispatch(setCredentials({ token, user }));

      console.log('✅ Token refreshed. Retrying original request...');
      result = await baseQuery(args, api, extraOptions);
    } else {
      console.log('❌ Refresh failed. Logging out...');
      api.dispatch(logOut());
    }
  }

  return result;
};

export const myApi = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}), // endpoints injected later
});

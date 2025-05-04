import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { apiSlice } from '../redux/slices/apiSlice';
import authReducer from '../slices/authSlice';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';

const authPersistConfig = {
  key: 'auth',
  storage: AsyncStorage,
  whitelist: ['token', 'user', 'isAuthenticated'], // only persist these from auth slice
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  [apiSlice.reducerPath]: apiSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(apiSlice.middleware),
  devTools: __DEV__,
});

export const persistor = persistStore(store);

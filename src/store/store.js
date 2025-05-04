import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { myApi } from '../api/myApi';
import authReducer from './auth/auth.slice';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';

const authPersistConfig = {
  key: 'auth',
  storage: AsyncStorage,
  whitelist: ['token', 'user', 'isAuthenticated'], // only persist these from auth slice
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  [myApi.reducerPath]: myApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(myApi.middleware),
  devTools: __DEV__,
});

export const persistor = persistStore(store);

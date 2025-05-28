import React from 'react';
import { Provider } from 'react-redux';
import { store, persistor } from './src/store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/navigations/RootNavigator.js';
import { ForgotPassword, Login } from './src/screens';
import { Linking } from 'react-native';

const linking = {
  prefixes: [
    'mandyportal://', // custom scheme
    'https://portal.mandyintranet.in', // web
  ],
  config: {
    screens: {
      Home: '',
      Login: 'login',
      ResetPassword: 'reset-password',
      ForgotPassword: 'forgot-password',
    },
  },
};

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer linking={linking}>
          <RootNavigator />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

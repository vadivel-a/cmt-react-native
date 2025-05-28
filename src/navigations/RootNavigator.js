// src/navigations/RootNavigator.js

import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AuthNavigator from './AuthNavigator';
import DrawerNavigator from './DrawerNavigator';
import { useSelector } from 'react-redux';
import { ROUTES } from '../constants';
import { ForgotPassword, Register, Login, ResetPassword } from '../screens';

const Stack = createStackNavigator();

const RootNavigator = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* Main flow */}
      <Stack.Screen name="Main" component={isAuthenticated ? DrawerNavigator : AuthNavigator} />
      {/* 🔁 Common Screens (accessible from anywhere) */}
      <Stack.Screen name={ROUTES.LOGIN} component={Login} />
      <Stack.Screen name={ROUTES.REGISTER} component={Register} />
      <Stack.Screen name={ROUTES.FORGOT_PASSWORD} component={ForgotPassword} />
      <Stack.Screen name={ROUTES.RESET_PASSWORD} component={ResetPassword} />
      {/* Add more like Profile, Settings, etc. here */}
    </Stack.Navigator>
  );
};


export default RootNavigator;

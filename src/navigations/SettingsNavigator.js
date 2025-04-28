import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Settings, SettingsDetail, Login} from '../screens';
import {ROUTES} from '../constants';

const Stack = createStackNavigator();

function SettingsNavigator() {

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={ROUTES.SETTINGS}>
      <Stack.Screen name={ROUTES.SETTINGS} component={Settings} />
      <Stack.Screen name={ROUTES.SETTINGS_DETAIL} component={SettingsDetail} />
      <Stack.Screen name={ROUTES.LOGIN} component={Login} />
    </Stack.Navigator>
  );
}

export default SettingsNavigator;

import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Settings, SettingsDetail, Login, Profile} from '../screens';
import {ROUTES} from '../constants';
import ProfileUpdate from '../screens/home/ProfileUpdate';

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
      <Stack.Screen name={ROUTES.PROFILE} component={Profile} />
      <Stack.Screen name={ROUTES.LOGIN} component={Login} />
      <Stack.Screen name={ROUTES.PROFILE_UPDATE} component={ProfileUpdate} />
    </Stack.Navigator>
  );
}

export default SettingsNavigator;

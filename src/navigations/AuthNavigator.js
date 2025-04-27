import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Login} from '../screens';
import {ROUTES} from '../constants';

const Stack = createStackNavigator();
// Navigator, Screen, Group

function AuthNavigator() {

  return (
    <Stack.Navigator screenOptions={{}} initialRouteName={ROUTES.LOGIN}>
      <Stack.Screen
        name={ROUTES.LOGIN}
        component={Login}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default AuthNavigator;

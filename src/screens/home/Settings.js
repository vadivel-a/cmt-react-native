import React from 'react';
import {StyleSheet, Text, SafeAreaView, TouchableOpacity} from 'react-native';
import {COLORS, ROUTES} from '../../constants';
import {ButtonStyles} from '../../styles';

const Settings = ({navigation}) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.bgColor,
      }}>
      <Text>Settings</Text>

      <TouchableOpacity
        onPress={() => navigation.navigate(ROUTES.SETTINGS_DETAIL)}
        style={ButtonStyles.primary}
        activeOpacity={0.8}>
        <Text style={ButtonStyles.primaryText}>Go To Settings Detail</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate(ROUTES.LOGIN)}
        style={ButtonStyles.primary}
        activeOpacity={0.8}>
        <Text style={ButtonStyles.primaryText}>Log out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Settings;

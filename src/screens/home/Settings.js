import React from 'react';
import {Text, SafeAreaView, TouchableOpacity} from 'react-native';
import {COLORS, ROUTES} from '../../constants';
import {ButtonStyles} from '../../styles';
import { useDispatch } from 'react-redux';
import { logOut } from '../../store/auth/auth.slice';

const SiteSettings = ({navigation}) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logOut());
    navigation.replace(ROUTES.LOGIN);
  };

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
        onPress={() => navigation.navigate(ROUTES.PROFILE)}
        style={ButtonStyles.primary}
        activeOpacity={0.8}>
        <Text style={ButtonStyles.primaryText}>Go To Profile Detail</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleLogout} // <-- Updated here
        style={ButtonStyles.primary}
        activeOpacity={0.8}>
        <Text style={ButtonStyles.primaryText}>Log out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default SiteSettings;

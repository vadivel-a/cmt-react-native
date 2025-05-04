import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Image,
  View,
  Dimensions,
  Text,
  TouchableOpacity,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS, IMGS } from '../constants';
import { API_URL } from '../constants/Config';
import { logOut } from '../store/auth/auth.slice';
import { ROUTES } from '../constants';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('screen');

const InfoRow = ({ icon, label, value }) => (
  <View style={styles.infoRow}>
    <Icon name={icon} size={18} color={COLORS.primary} style={styles.infoIcon} />
    <Text style={styles.infoText}>
      <Text style={styles.infoLabel}>{label}:</Text> {value}
    </Text>
  </View>
);

const CustomDrawer = (props) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const meta = user?.user_meta || {};

  const avatarUrl = meta?.avatar ? API_URL + meta?.avatar : '';

  const handleLogout = () => {
    dispatch(logOut());
    props.navigation.navigate('Login');
  };

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flexGrow: 1 }}>
      <ImageBackground source={IMGS.bgPattern} style={{ height: 140 }}>
        {avatarUrl ? (
          <Image
            source={{ uri: avatarUrl }}
            style={styles.userImg}
          />
        ) : (
          <Image
            source={IMGS.user}
            style={styles.userImg}
          />
        )}
      </ImageBackground>

      <View style={styles.profileCard}>
        <Text style={styles.nameText}>{user?.name}</Text>

        {meta.job && <InfoRow icon="briefcase-outline" label="Job Position" value={meta.job} />}
        {meta.age && <InfoRow icon="calendar-outline" label="Age" value={meta.age} />}
        {meta.address && <InfoRow icon="location-outline" label="Address" value={meta.address} />}
        {meta.city && <InfoRow icon="business-outline" label="City" value={meta.city} />}
        {meta.state && <InfoRow icon="map-outline" label="State" value={meta.state} />}
        {meta.country && <InfoRow icon="earth-outline" label="Country" value={meta.country} />}
      </View>

      <View style={styles.drawerListWrapper}>
        <DrawerItemList {...props} />
      </View>

      {/* 🔴 Logout Button */}
      <View style={styles.logoutContainer}>
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Icon name="log-out-outline" size={20} color={COLORS.white} style={{ marginRight: 8 }} />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  userImg: {
    width: 110,
    height: 110,
    borderRadius: 55,
    position: 'absolute',
    left: width / 2 - 90,
    bottom: -55,
    borderWidth: 4,
    borderColor: COLORS.white,
  },
  profileCard: {
    backgroundColor: COLORS.white,
    marginTop: 65,
    marginHorizontal: 5,
    padding: 16,
    borderRadius: 12,
    shadowColor: COLORS.black,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 5,
  },
  nameText: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.primary,
    textAlign: 'center',
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoIcon: {
    marginRight: 10,
    width: 22,
  },
  infoText: {
    fontSize: 14,
    color: COLORS.dark,
    flexShrink: 1,
  },
  infoLabel: {
    fontWeight: '600',
    color: COLORS.gray,
  },
  drawerListWrapper: {
    marginTop: 20,
  },
  logoutContainer: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    padding: 12,
    borderRadius: 8,
    justifyContent: 'center',
  },
  logoutText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 14,
  },
});

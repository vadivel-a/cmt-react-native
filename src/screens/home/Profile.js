import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Switch, TouchableOpacity, Dimensions, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import { COLORS, IMGS } from '../../constants';
import { API_URL } from '../../constants/Config';
import { GlobalStyles } from '../../styles';
import { ROUTES } from '../../constants';

const { width } = Dimensions.get('screen');

// Reusable component for setting row
const SettingItem = ({ label, isSwitch, value, onValueChange, onPress }) => (
  <View style={styles.itemRow}>
    <Text style={styles.label}>{label}</Text>
    {isSwitch ? (
      <Switch value={value} onValueChange={onValueChange} />
    ) : (
      <TouchableOpacity onPress={onPress}>
        <Icon name="chevron-forward" size={20} color={COLORS.gray} />
      </TouchableOpacity>
    )}
  </View>
);

// Reusable card section
const Section = ({ icon, title, subtitle, children }) => (
  <View style={styles.card}>
    <View style={styles.headerRow}>
      <View style={styles.iconBox}>
        <Icon name={icon} size={18} color="#fff" />
      </View>
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    </View>
    <View style={styles.divider} />
    {children}
  </View>
);

const ProfileSettings = (props) => {
  const { user } = useSelector((state) => state.auth);
  const meta = user?.user_meta || {};
  const avatarUrl = meta?.avatar ? API_URL + meta.avatar : null;

  const [darkMode, setDarkMode] = useState(false);
  const [faceID, setFaceID] = useState(true);
  const [autoLock, setAutoLock] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={GlobalStyles.container_tab}>
        {/* Profile Card */}
        <View style={styles.card}>
          <View style={styles.edit}>
            <TouchableOpacity onPress={() => props.navigation.navigate(ROUTES.PROFILE_UPDATE)}>
              <Icon name="create-outline" size={20} color={COLORS.primary} />
            </TouchableOpacity>
          </View>

          <View style={styles.profileHeader}>
            <Image
              source={avatarUrl ? { uri: avatarUrl } : IMGS.user}
              style={styles.avatar}
            />
            <Text style={styles.name}>{user?.name}</Text>
            <Text style={styles.email}>{user?.email}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.metaList}>
            {meta.job && <InfoRow icon="briefcase-outline" label="Job Position" value={meta.job} />}
            {meta.age && <InfoRow icon="calendar-outline" label="Age" value={meta.age} />}
            {meta.address && <InfoRow icon="location-outline" label="Address" value={meta.address} />}
            {meta.city && <InfoRow icon="business-outline" label="City" value={meta.city} />}
            {meta.state && <InfoRow icon="map-outline" label="State" value={meta.state} />}
            {meta.country && <InfoRow icon="earth-outline" label="Country" value={meta.country} />}
          </View>
        </View>

        {/* Recommended Settings */}
        <Section icon="settings-outline" title="Recommended Settings" subtitle="These are the most important settings">
          <SettingItem label="Dark Mode" isSwitch value={darkMode} onValueChange={setDarkMode} />
          <SettingItem label="Notifications" onPress={() => {}} />
        </Section>

        {/* Privacy */}
        <Section icon="document-text-outline" title="Privacy Settings" subtitle="Third most important settings">
          <SettingItem label="User Agreement" onPress={() => {}} />
          <SettingItem label="Privacy" onPress={() => {}} />
        </Section>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileSettings;

// Info row for profile meta data
const InfoRow = ({ icon, label, value }) => (
  <View style={styles.infoRow}>
    <Icon name={icon} size={18} color={COLORS.primary} style={styles.infoIcon} />
    <Text style={styles.infoText}>
      <Text style={styles.infoLabel}>{label}:</Text> {value}
    </Text>
  </View>
);

// Styles
const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: COLORS.primary,
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.primary,
  },
  email: {
    fontSize: 14,
    color: COLORS.gray,
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 12,
  },
  metaList: {
    marginTop: 8,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoIcon: {
    marginRight: 8,
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
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBox: {
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 12,
    marginRight: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.dark,
  },
  subtitle: {
    fontSize: 13,
    color: COLORS.gray,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  label: {
    fontSize: 15,
    color: COLORS.dark,
  },
  edit: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  }
});

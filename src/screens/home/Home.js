import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { GlobalStyles } from '../../styles';
import { COLORS } from '../../constants';

const groupedFeatures = [
  {
    group: 'Account',
    features: [
      { title: 'Profile', icon: 'person' },
      { title: 'Settings', icon: 'settings' },
      { title: 'Security', icon: 'security' },
      { title: 'Logout', icon: 'logout' },
    ],
  },
  {
    group: 'Tools',
    features: [
      { title: 'Wallet', icon: 'account-balance-wallet' },
      { title: 'Map', icon: 'map' },
      { title: 'Photos', icon: 'photo-library' },
      { title: 'Calendar', icon: 'calendar-month' },
    ],
  },
  {
    group: 'Support',
    features: [
      { title: 'Help', icon: 'help-outline' },
      { title: 'Feedback', icon: 'feedback' },
      { title: 'Contact', icon: 'support-agent' },
      { title: 'About', icon: 'info' },
    ],
  },
];

const CARD_SIZE = (Dimensions.get('window').width - 64) / 4;

const FeatureItem = ({ icon, title }) => (
  <TouchableOpacity
    style={styles.card}
    activeOpacity={0.8}
    onPress={() => console.log(`Pressed: ${title}`)}
  >
    <MaterialIcons name={icon} size={28} color="#777" style={{ marginBottom: 8 }} />
    <Text style={styles.cardText}>{title}</Text>
  </TouchableOpacity>
);

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
        {/* Top Banner Section */}
        <View style={styles.banner}>
          <Text style={styles.bannerText}>Welcome to Our Mandy</Text>
          <Text style={styles.bannerSubtitle}>Your personalized dashboard</Text>
        </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {groupedFeatures.map((section, index) => (
          <View key={index} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.group}</Text>
            <View style={styles.row}>
              {section.features.map((feature, i) => (
                <FeatureItem key={i} icon={feature.icon} title={feature.title} />
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f0f4f8',
  },
  scrollContainer: {
    padding: 16,
  },
  // Top Banner styles
  banner: {
    backgroundColor: COLORS.primary,
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 20,
    alignItems: 'center',
  },
  bannerText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
  },
  bannerSubtitle: {
    fontSize: 14,
    color: '#fff',
    marginTop: 4,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
    color: '#1f2937',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: CARD_SIZE,
    height: CARD_SIZE,
    backgroundColor: '#ffffffcc',
    borderRadius: 16,
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  cardText: {
    fontSize: 12,
    textAlign: 'center',
    color: '#374151',
    fontWeight: '500',
  },
});

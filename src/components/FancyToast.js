import React, { useEffect } from 'react';
import { Animated, Text, View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Use react-native-vector-icons

const { width } = Dimensions.get('window');

const FancyToast = ({ visible, onClose, type = 'success', message = '' }) => {
  const translateY = new Animated.Value(-100);

  useEffect(() => {
    if (visible) {
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
        bounciness: 12,
      }).start();

      const timeout = setTimeout(() => {
        Animated.timing(translateY, {
          toValue: -100,
          duration: 300,
          useNativeDriver: true,
        }).start(() => onClose?.());
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [visible]);

  const colors = {
    success: '#22c55e',
    error: '#ef4444',
    warning: '#f59e0b',
    info: '#3b82f6',
  };

  const icons = {
    success: 'checkmark-circle-outline',
    error: 'close-circle-outline',
    warning: 'alert-circle-outline',
    info: 'information-circle-outline',
  };

  return visible ? (
    <Animated.View
      style={[
        styles.container,
        { backgroundColor: colors[type], transform: [{ translateY }] },
      ]}
    >
      <Icon name={icons[type]} size={24} color="white" style={styles.icon} />
      <Text style={styles.message}>{message}</Text>
      <TouchableOpacity onPress={onClose}>
        <Icon name="close" size={20} color="#fff" />
      </TouchableOpacity>
    </Animated.View>
  ) : null;
};

export default FancyToast;

const styles = StyleSheet.create({
  container: {
    position: 'absolute', // Changed from 'fixed' to 'absolute'
    top: 40, // Adjust this value to position the toast from the top
    left: 20,
    right: 20,
    zIndex: 9999, // Ensure the toast appears above other content
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  icon: {
    marginRight: 10,
  },
  message: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
  },
});

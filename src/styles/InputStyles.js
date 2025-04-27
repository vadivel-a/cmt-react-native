import { StyleSheet } from 'react-native';
import { COLORS } from '../constants';

export default StyleSheet.create({
  input: {
    height: 55,
    borderWidth: 1,
    borderColor: COLORS.grayLight, // light gray border by default
    borderRadius: 4,
    paddingHorizontal: 15,
    marginVertical: 10,
    fontSize: 16,
    color: COLORS.text, // your text color
    backgroundColor: COLORS.white, // input bg color
    elevation: 2, // shadow for Android
    shadowColor: '#000', // shadow for iOS
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  // Success state (green border)
  success: {
    borderColor: COLORS.success, // success color, you can set this to green
  },
  label: {
    fontSize: 14,
    color: COLORS.gray,
    marginBottom: 4,
    marginLeft: 2,
  },
  // Error state
  errorText: {
    color: COLORS.error,
    fontSize: 12,
    marginTop: 2,
    marginLeft: 2,
  },
});

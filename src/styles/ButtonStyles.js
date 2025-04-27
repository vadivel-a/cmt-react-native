import { StyleSheet } from 'react-native';
import { COLORS } from '../constants';

export default StyleSheet.create({
  primary: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    paddingHorizontal: 24,
    marginVertical: 10,
    borderRadius: 8,
    elevation: 3, // <-- Material Design shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%', // full width (you can override if needed)
  },
  primaryText: {
    color: COLORS.white,
    fontWeight: '600',
    fontSize: 16,
    letterSpacing: 0.5,
    textAlign: 'center',
    textTransform: 'uppercase', // Material buttons usually uppercase
  },
});

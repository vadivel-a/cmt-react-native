import { StyleSheet } from 'react-native';
import { COLORS } from '../constants';

const Button = StyleSheet.create({
    primary: {
        backgroundColor: COLORS.primary,
        padding: 17,
        margin: 10,
        borderRadius: 5,
        fontSize: 18,
        width: 180,
    },
    primaryText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    },
});

export default Button;

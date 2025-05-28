import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { COLORS, ROUTES } from '../../constants';
import { ButtonStyles, InputStyles, GlobalStyles } from '../../styles';
import Logo from '../../assets/icons/LOGO.svg';
import useForm from '../../hooks/useForm';
import { useResetPasswordMutation } from '../../store/auth/auth.api';

const ResetPassword = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const [successMessage, setSuccessMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [token, setToken] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (route.params?.token && route.params?.email) {
      setToken(route.params.token);
      setEmail(route.params.email);
      console.log(route.params);
    } else {
      setErrors({ token: 'Invalid or missing token or email in reset link.' });
    }
  }, [route.params]);

  const rules = {
    password: { required: true, minLength: 8 },
    c_password: {
      required: true,
      custom: {
        isValid: (val, values) => val === values.password,
        message: 'Passwords do not match',
      },
    },
  };

  const { values, errors: formErrors, handleChange, handleSubmit } = useForm(
    { password: '', c_password: '' },
    rules
  );

  const onSubmit = async (formData) => {
    try {
      const payload = {
        token,
        email,
        password: formData.password,
        c_password: formData.c_password,
      };
      const response = await resetPassword(payload).unwrap();
      setSuccessMessage(response?.message || 'Password reset successful.');
      setErrors({});
    } catch (error) {
      const message = error?.data?.message || 'Failed to reset password.';
      setErrors({ api: message });
    }
  };

  return (
    <SafeAreaView style={GlobalStyles.main}>
      <View style={GlobalStyles.container}>
        <View style={GlobalStyles.wFull}>
          <View style={GlobalStyles.row}>
            <Logo width={55} height={55} style={GlobalStyles.mr7} />
          </View>

          <Text style={[GlobalStyles.h3, GlobalStyles.heading, GlobalStyles.textAlignCenter]}>
            Reset Password
          </Text>

          <TextInput
            style={InputStyles.input}
            placeholder="New password"
            secureTextEntry
            value={values.password}
            onChangeText={(text) => handleChange('password', text)}
          />
          {formErrors.password && <Text style={GlobalStyles.errorText}>{formErrors.password}</Text>}

          <TextInput
            style={InputStyles.input}
            placeholder="Confirm password"
            secureTextEntry
            value={values.c_password}
            onChangeText={(text) => handleChange('c_password', text)}
          />
          {formErrors.c_password && (
            <Text style={GlobalStyles.errorText}>{formErrors.c_password}</Text>
          )}

          {errors.token && <Text style={GlobalStyles.errorText}>{errors.token}</Text>}
          {errors.api && <Text style={GlobalStyles.errorText}>{errors.api}</Text>}
          {successMessage && <Text style={styles.successText}>{successMessage}</Text>}

          <TouchableOpacity
            onPress={() => handleSubmit(onSubmit)}
            style={[ButtonStyles.primary, GlobalStyles.wFull, GlobalStyles.mt20]}
            activeOpacity={0.8}
            disabled={isLoading || !token || !email}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color={COLORS.white} />
            ) : (
              <Text style={ButtonStyles.primaryText}>Reset Password</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate(ROUTES.LOGIN)}>
            <Text style={styles.backText}>Back to Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({
  successText: {
    color: 'green',
    textAlign: 'center',
    marginTop: 10,
    fontWeight: '600',
  },
  backText: {
    color: COLORS.primary,
    textAlign: 'center',
    marginTop: 20,
    fontWeight: 'bold',
  },
});

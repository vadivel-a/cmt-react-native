import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS, ROUTES } from '../../constants';
import { ButtonStyles, InputStyles, GlobalStyles } from '../../styles';
import Logo from '../../assets/icons/logo.svg';
import useForm from '../../hooks/useForm';
// import your API hook
import { useForgotPasswordMutation } from '../../store/auth/auth.api';

const ForgotPassword = () => {
  const navigation = useNavigation();
  const [successMessage, setSuccessMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const rules = {
    email: { required: true, email: true },
  };

  const { values, errors: formErrors, handleChange, handleSubmit } = useForm(
    { email: '' },
    rules
  );

  const onSubmit = async (formData) => {
    try {
      const response = await forgotPassword({ email: formData.email }).unwrap();
      setSuccessMessage(response?.message || 'Reset link sent to your email.');
      setErrors({});
    } catch (error) {
      console.log(error);
      const message = error?.data?.message || 'Failed to send reset link.';
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
            Forgot Password
          </Text>

          <TextInput
            style={InputStyles.input}
            placeholder="Enter your email"
            value={values.email}
            onChangeText={(text) => handleChange('email', text)}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          {formErrors.email && <Text style={GlobalStyles.errorText}>{formErrors.email}</Text>}
          {errors.api && <Text style={GlobalStyles.errorText}>{errors.api}</Text>}
          {successMessage && (
            <Text style={styles.successText}>{successMessage}</Text>
          )}

          <TouchableOpacity
            onPress={() => handleSubmit(onSubmit)}
            style={[ButtonStyles.primary, GlobalStyles.wFull, GlobalStyles.mt20]}
            activeOpacity={0.8}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color={COLORS.white} />
            ) : (
              <Text style={ButtonStyles.primaryText}>Send Reset Link</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backText}>Back to Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ForgotPassword;

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

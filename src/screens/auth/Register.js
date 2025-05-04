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
import { COLORS, ROUTES } from '../../constants';
import Logo from '../../assets/icons/logo.svg';
import { useNavigation } from '@react-navigation/native';
import { ButtonStyles, InputStyles, GlobalStyles } from '../../styles';
import useForm from '../../hooks/useForm';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../store/auth/auth.slice';
import { useRegisterMutation } from '../../store/auth/auth.api';

const Register = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const [register, { isLoading }] = useRegisterMutation();

  const rules = {
    name: { required: true },
    email: { required: true, email: true },
    password: { required: true, minLength: 4 },
    c_password: {
      required: true,
      custom: {
        isValid: (val, values) => val === values.password,
        message: 'Passwords do not match',
      },
    },
  };

  const { values, errors: formErrors, handleChange, handleSubmit } = useForm(
    { name: '', email: '', password: '', c_password: '' },
    rules
  );

  const onSubmit = async (formData) => {
    try {
      const userData = await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        c_password: formData.c_password,
      }).unwrap();

      dispatch(setCredentials(userData));
      setSuccessMessage('Registration successful! Redirecting to login...');
      setErrors({});

      setTimeout(() => {
        navigation.replace(ROUTES.LOGIN);
      }, 4000);
    } catch (error) {
      console.log(error);
      const message =
        error?.data?.message || error?.error || 'Registration failed. Please try again.';
      setErrors((prev) => ({ ...prev, api: message }));
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
            Create an account
          </Text>

          <TextInput
            style={InputStyles.input}
            placeholder="Name"
            value={values.name}
            onChangeText={(text) => handleChange('name', text)}
          />
          {formErrors.name && <Text style={GlobalStyles.errorText}>{formErrors.name}</Text>}

          <TextInput
            style={InputStyles.input}
            placeholder="Email"
            value={values.email}
            onChangeText={(text) => handleChange('email', text)}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
          />
          {formErrors.email && <Text style={GlobalStyles.errorText}>{formErrors.email}</Text>}

          <TextInput
            style={InputStyles.input}
            placeholder="Password"
            secureTextEntry
            value={values.password}
            onChangeText={(text) => handleChange('password', text)}
          />
          {formErrors.password && <Text style={GlobalStyles.errorText}>{formErrors.password}</Text>}

          <TextInput
            style={InputStyles.input}
            placeholder="Confirm Password"
            secureTextEntry
            value={values.c_password}
            onChangeText={(text) => handleChange('c_password', text)}
          />
          {formErrors.c_password && (
            <Text style={GlobalStyles.errorText}>{formErrors.c_password}</Text>
          )}

          {successMessage && (
            <Text style={[styles.successText]}>{successMessage}</Text>
          )}
          {errors.api && <Text style={GlobalStyles.errorText}>{errors.api}</Text>}

          <TouchableOpacity
            onPress={() => handleSubmit(onSubmit)}
            style={[ButtonStyles.primary, GlobalStyles.wFull, GlobalStyles.mt20, GlobalStyles.ml0]}
            activeOpacity={0.8}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color={COLORS.white} />
            ) : (
              <Text style={ButtonStyles.primaryText}>Register</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate(ROUTES.LOGIN)}
            style={styles.loginBtn}
          >
            <Text style={styles.loginText}>Already have an account? Log In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Register;

const styles = StyleSheet.create({
  loginText: {
    color: COLORS.primary,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 20,
  },
  successText: {
    color: 'green',
    textAlign: 'center',
    fontWeight: '600',
    marginTop: 10,
  },
});

import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, SafeAreaView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { COLORS, ROUTES } from '../../constants';
import Logo from '../../assets/icons/LOGO.svg';
import { useNavigation } from '@react-navigation/native';
import { ButtonStyles, InputStyles, GlobalStyles } from '../../styles';
import useForm from '../../hooks/useForm';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../store/auth/auth.slice';
import { useLoginMutation } from '../../store/auth/auth.api';

const Login = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [login, { isLoading: loginLoading }] = useLoginMutation();

  // Define validation rules for the form fields
  const rules = {
    email: { required: true, email: true },
    password: { required: true, minLength: 4 },
  };

  // Use the useForm hook with initial values and validation rules
  const { values, errors: formErrors, handleChange, handleSubmit } = useForm(
    { email: 'admin@admin.com', password: 'Password' },
    rules
  );

  const onSubmit = async (formData) => {
    setLoading(true);
    try {
      const userData = await login({ email: formData.email, password: formData.password }).unwrap();
      dispatch(setCredentials(userData));
      setLoading(false);
      console.log(userData);
    } catch (error) {
      console.log(error);
      const message =
        error?.data?.message || error?.error || 'Login failed. Please try again.';
      setErrors((prev) => ({ ...prev, api: message }));
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={GlobalStyles.main}>
      <View style={GlobalStyles.container}>
        <View style={GlobalStyles.wFull}>
          <View style={GlobalStyles.row}>
            <Logo width={55} height={55} style={GlobalStyles.mr7} />
          </View>

          <Text style={[GlobalStyles.h3, GlobalStyles.heading, GlobalStyles.textAlignCenter]}>Login in to continue</Text>

          <TextInput
            style={InputStyles.input}
            placeholder="Email"
            value={values.email}
            onChangeText={text => handleChange('email', text)}
          />
          {formErrors.email && <Text style={GlobalStyles.errorText}>{formErrors.email}</Text>}

          <TextInput
            style={InputStyles.input}
            placeholder="Password"
            secureTextEntry
            value={values.password}
            onChangeText={text => handleChange('password', text)}
          />
          {formErrors.password && <Text style={GlobalStyles.errorText}>{formErrors.password}</Text>}

          {errors.api && <Text style={GlobalStyles.errorText}>{errors.api}</Text>}

          <TouchableOpacity
            onPress={() => handleSubmit(onSubmit)}
            style={[ButtonStyles.primary, GlobalStyles.wFull, GlobalStyles.mt20, GlobalStyles.ml0]}
            activeOpacity={0.8}
            disabled={loading} // Disable button while loading
          >
            {loading ? (
              <ActivityIndicator size="small" color={COLORS.white} />
            ) : (
              <Text style={ButtonStyles.primaryText}>LogIn</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate(ROUTES.FORGOT_PASSWORD, {
                userId: 'X0001',
              })
            }
            style={styles.forgotPassBtn}>
            <Text style={styles.forgotPassText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}> Don't have an account? </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate(ROUTES.REGISTER)}>
            <Text style={styles.signupBtn}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  forgotPassText: {
    color: COLORS.primary,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 15,
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    textAlign: 'center',
    flexDirection: 'row',
  },
  footerText: {
    color: COLORS.gray,
    fontWeight: 'bold',
  },
  signupBtn: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
});

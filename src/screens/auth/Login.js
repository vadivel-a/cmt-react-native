import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, SafeAreaView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { COLORS, ROUTES } from '../../constants';
import Logo from '../../assets/icons/logo.svg';
import { useNavigation } from '@react-navigation/native';
import { ButtonStyles, InputStyles, GlobalStyles } from '../../styles';
import useForm from '../../hooks/useForm';  // Your custom useForm hook

const Login = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false); // Add loading state

  // Define validation rules for the form fields
  const rules = {
    email: { required: true, email: true },
    password: { required: true, minLength: 6 }
  };

  // Use the useForm hook with initial values and validation rules
  const { values, errors, handleChange, handleSubmit } = useForm(
    { email: '', password: '' },  // Initial values
    rules  // Validation rules
  );

  const onSubmit = (formData) => {
    setLoading(true); // Set loading to true when submitting
    console.log('Email:', formData.email);
    console.log('Password:', formData.password);

    //API call or some async operation
    setTimeout(() => {
      setLoading(false);

    }, 2000);
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
          {errors.email && <Text style={GlobalStyles.errorText}>{errors.email}</Text>}

          <TextInput
            style={InputStyles.input}
            placeholder="Password"
            secureTextEntry
            value={values.password}
            onChangeText={text => handleChange('password', text)}
          />
          {errors.password && <Text style={GlobalStyles.errorText}>{errors.password}</Text>}

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

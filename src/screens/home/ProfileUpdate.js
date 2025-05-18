import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { COLORS, IMGS } from '../../constants';
import { API_URL } from '../../constants/Config';
import { setProfile } from '../../store/auth/auth.slice';
import { GlobalStyles, InputStyles, ButtonStyles } from '../../styles';
import { launchImageLibrary } from 'react-native-image-picker';
import { useProfileUpdateMutation, useProfileMutation } from '../../store/auth/auth.api';

const ProfileUpdate = ({ navigation }) => {
  const dispatch = useDispatch();
  const [fetchProfile] = useProfileMutation();
  const { user } = useSelector((state) => state.auth);

  const [avatar, setAvatar] = useState(
    user.user_meta?.avatar ? { uri: API_URL + user.user_meta.avatar } : null
  );
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    user_id: user.id || '',
    name: user.name || '',
    email: user.email || '',
    age: user.user_meta?.age?.toString() || '',
    address: user.user_meta?.address || '',
    job: user.user_meta?.job || '',
    city: user.user_meta?.city || '',
    state: user.user_meta?.state || '',
    country: user.user_meta?.country || '',
    postalcode: user.user_meta?.postalcode || '',
    about: user.user_meta?.about || '',
    password: '',
    c_password: '',
  });

  const [update] = useProfileUpdateMutation();

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
    setErrors({ ...errors, [key]: null });
  };

  const handleChooseAvatar = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: true,
      },
      (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          console.error('Image Picker Error: ', response.errorMessage);
        } else {
          const asset = response.assets[0];
          setAvatar({
            uri: asset.uri,
            base64: asset.base64,
            fileName: asset.fileName,
          });
        }
      }
    );
  };

  const handleUpdate = async () => {
    setLoading(true);
    setErrors({});
    setSuccessMessage('');

    const data = {
      user_id: user.id,
      name: form.name,
      email: form.email,
      password: form.password,
      c_password: form.c_password,
    };

    // Add user_meta fields
    Object.entries(form).forEach(([key, value]) => {
      if (
        [
          'age',
          'address',
          'job',
          'city',
          'state',
          'country',
          'postalcode',
          'about',
        ].includes(key)
      ) {
        data[`meta_${key}`] = value;
      }
    });

    // Add avatar
    if (avatar?.base64) {
      const extension = avatar.fileName?.split('.').pop() || 'jpg';
      data.avatar = `data:image/${extension};base64,${avatar.base64}`;
    }

    try {
      const response = await update(data).unwrap();

      if (response?.status === 422 && response?.data) {
        setErrors(response.data);
        setSuccessMessage(response.message);
        return;
      }

      setErrors({});
      setSuccessMessage('Profile updated successfully!');

      const getProfile = await fetchProfile();
      dispatch(setProfile({data: getProfile.data}));
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      const errData = err?.data;
      if (errData?.status === 422 && errData?.data) {
        setErrors(errData.data);
        setSuccessMessage(errData.message);
      } else {
        Alert.alert('Error', errData?.message || 'Failed to update profile');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={[GlobalStyles.wFull]}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={GlobalStyles.h3}>Update Profile</Text>

        {successMessage !== '' && (
          <View style={styles.successBox}>
            <Text style={styles.successText}>{successMessage}</Text>
          </View>
        )}

        <TouchableOpacity onPress={handleChooseAvatar}>
          <Image
            source={avatar?.uri ? { uri: avatar.uri } : IMGS.user}
            style={styles.avatar}
          />
          <Text style={styles.avatarText}>Tap to change photo</Text>
        </TouchableOpacity>

        <View>
          {[
            { label: 'Email', key: 'email', disabled: true },
            { label: 'Name', key: 'name' },
            { label: 'Password', key: 'password' },
            { label: 'Confirm Password', key: 'c_password' },
            { label: 'Age', key: 'age' },
            { label: 'Address', key: 'address' },
            { label: 'Job', key: 'job' },
            { label: 'City', key: 'city' },
            { label: 'State', key: 'state' },
            { label: 'Country', key: 'country' },
            { label: 'Postal Code', key: 'postalcode' },
            { label: 'About', key: 'about', multiline: true },
          ].map(({ label, key, multiline, disabled }) => (
            <View key={key} style={{ width: '100%' }}>
              <TextInput
                placeholder={label}
                value={form[key]}
                onChangeText={(val) => handleChange(key, val)}
                style={InputStyles.input}
                multiline={multiline}
                editable={!disabled}
              />
              {errors[key] && (
                <Text style={{ color: 'red', marginBottom: 8 }}>
                  {Array.isArray(errors[key]) ? errors[key][0] : errors[key]}
                </Text>
              )}
            </View>
          ))}
        </View>

        <TouchableOpacity
          onPress={handleUpdate}
          style={[ButtonStyles.primary, GlobalStyles.mt20]}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color={COLORS.white} />
          ) : (
            <Text style={ButtonStyles.primaryText}>Update Profile</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileUpdate;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    width: '100%',
    paddingBottom: 100,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: COLORS.primary,
    alignSelf: 'center',
    marginBottom: 10,
  },
  avatarText: {
    textAlign: 'center',
    color: COLORS.gray,
    marginBottom: 20,
  },
  successBox: {
    backgroundColor: '#DFF2BF',
    padding: 10,
    borderRadius: 6,
    marginBottom: 20,
  },
  successText: {
    color: '#4F8A10',
    textAlign: 'center',
  },
});

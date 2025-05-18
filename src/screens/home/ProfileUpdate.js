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
import { setCredentials } from '../../store/auth/auth.slice';
import { GlobalStyles, InputStyles, ButtonStyles } from '../../styles';
import { launchImageLibrary } from 'react-native-image-picker';
import { useProfileUpdateMutation } from '../../store/auth/auth.api';

const ProfileUpdate = ({ navigation }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const meta = user?.user_meta || {};

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [job, setJob] = useState(meta.job || '');
  const [city, setCity] = useState(meta.city || '');
  const [stateField, setStateField] = useState(meta.state || '');
  const [country, setCountry] = useState(meta.country || '');
  const [postalcode, setPostalcode] = useState(meta.postalcode || '');
  const [address, setAddress] = useState(meta.address || '');
  const [age, setAge] = useState(meta.age || '');
  const [about, setAbout] = useState(meta.about || '');
  const [avatar, setAvatar] = useState(
    meta.avatar ? { uri: API_URL + meta.avatar } : null
  );
  const [loading, setLoading] = useState(false);

  const [update] = useProfileUpdateMutation();

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
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('user_meta[job]', job);
      formData.append('user_meta[city]', city);
      formData.append('user_meta[state]', stateField);
      formData.append('user_meta[country]', country);
      formData.append('user_meta[postalcode]', postalcode);
      formData.append('user_meta[address]', address);
      formData.append('user_meta[age]', age);
      formData.append('user_meta[about]', about);

      if (avatar?.base64) {
        const extension = avatar.fileName?.split('.').pop() || 'jpg';
        formData.append(
          'avatar',
          `data:image/${extension};base64,${avatar.base64}`
        );
      }

      const response = await update(formData).unwrap();

      if (response.data.status !== 422) {
        dispatch(setCredentials(response.data.user));
        Alert.alert('Success', 'Profile updated successfully');
      } else {
        Alert.alert('Failed', 'Profile updated failed');
      }
      //navigation.goBack();
    } catch (err) {
      console.error(err);
      Alert.alert('Error', `Failed to update profile:\n${JSON.stringify(err)}`);

    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={[GlobalStyles.wFull]}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={GlobalStyles.h3}>Update Profile</Text>

        <TouchableOpacity onPress={handleChooseAvatar}>
          <Image
            source={avatar?.uri ? { uri: avatar.uri } : IMGS.user}
            style={styles.avatar}
          />
          <Text style={styles.avatarText}>Tap to change photo</Text>
        </TouchableOpacity>

        <TextInput placeholder="Name" value={name} onChangeText={setName} style={InputStyles.input} />
        <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={InputStyles.input} />
        <TextInput placeholder="Job" value={job} onChangeText={setJob} style={InputStyles.input} />
        <TextInput placeholder="City" value={city} onChangeText={setCity} style={InputStyles.input} />
        <TextInput placeholder="State" value={stateField} onChangeText={setStateField} style={InputStyles.input} />
        <TextInput placeholder="Country" value={country} onChangeText={setCountry} style={InputStyles.input} />
        <TextInput placeholder="Postal Code" value={postalcode} onChangeText={setPostalcode} style={InputStyles.input} />
        <TextInput placeholder="Address" value={address} onChangeText={setAddress} style={InputStyles.input} />
        <TextInput placeholder="Age" value={age} onChangeText={setAge} style={InputStyles.input} />
        <TextInput
          placeholder="About"
          value={about}
          onChangeText={setAbout}
          style={[InputStyles.input, { height: 100, textAlignVertical: 'top' }]}
          multiline
        />

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
});

import {useState, useCallback} from 'react';

import {ImageBackground, ScrollView, StyleSheet, View} from 'react-native';

import uuid from 'react-native-uuid';
import {useFocusEffect, useNavigation} from '@react-navigation/native';

import StorageService from '../../AUTH/utils/StorageHelper';

import ASSETS from '../../AUTH/helpers/imports';
import ICONS from '../../AUTH/helpers/icons';

import About from '../components/About';
import Logout from '../components/Logout';
import Cards from '../components/Cards';

import {screen_height, screen_width} from '../../AUTH/utils/Dimensions';

const Profile = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [phone, setPhone] = useState('');
  const [userId, setUserId] = useState(`${uuid.v4()}`);

  const goToSecurityKeysScreen = () => navigation.navigate('SecurityKeys');

  function convertTimestampToDate(timestamp) {
    try {
      const date = new Date(
        timestamp.seconds * 1000 + Math.floor(timestamp.nanoseconds / 1000000),
      );
      return date.toDateString();
    } catch (error) {
      return new Date().toDateString();
    }
  }

  useFocusEffect(
    useCallback(() => {
      const fetchUpdatedData = async () => {
        const tempName = await StorageService.getItem('NAME');
        setName(tempName);
        const tempEmail = await StorageService.getItem('EMAIL');
        setEmail(tempEmail);
        const tempPhone = await StorageService.getItem('PHONE');
        setPhone(tempPhone);
        const tempId = await StorageService.getItem('USERID');
        setUserId(tempId);
        const tempDate = await StorageService.getItem('DOB');
        const date = JSON.parse(tempDate);
        setDob(convertTimestampToDate(date));
      };
      fetchUpdatedData();
    }, [])
  );

  const goToUpdateScreen = () => {
    const info = {
      name,
      email,
      phone,
      dob,
    };
    navigation.navigate('Update', {data: info});
  };

  const goToUsersScreen = () => navigation.navigate('Users', {id: userId});
  const goToContactUsScreen = () => navigation.navigate('ContactUs');

  const handleLogout = async () => {
    await StorageService.clearAll();
    await navigation.replace('SignIn');
    console.log('LOGGING OUT!');
  };

  return (
    <ImageBackground style={styles.container} source={ASSETS.ProfileBack}>
      <About data={{name, email, dob}} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.scroll}>
          <Cards
            label="Encryption/Decryption"
            icon={ICONS.ENCRYPTION_KEY}
            onClick={goToUsersScreen}
          />
          <Cards
            label="Security Keys"
            icon={ICONS.LOCK}
            onClick={goToSecurityKeysScreen}
          />
          <Cards
            label="Update Info"
            icon={ICONS.BILL}
            onClick={goToUpdateScreen}
          />
          <Cards
            label="Contact Us"
            icon={ICONS.CONTACTUS}
            onClick={goToContactUsScreen}
          />
          <Logout onClick={handleLogout} />
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: screen_height * 0.08,
    paddingBottom:70
  },
  scrollContent: {
    paddingVertical: 20,
  },
  scroll: {
    alignItems: 'center',
    gap: 10,
    width: screen_width,
  },
});

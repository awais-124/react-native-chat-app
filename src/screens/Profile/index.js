import {useState, useCallback} from 'react';

import {ScrollView, StyleSheet, View} from 'react-native';

import Screen, {BACKGROUND_VARIANTS} from '../../components/Screen';

import * as Crypto from 'expo-crypto';
import {useFocusEffect, useNavigation} from '@react-navigation/native';

import StorageService from '../../services/StorageService';

import ICONS from '../../constants/icons';

import About from '../../components/About';
import Logout from '../../components/Logout';
import Cards from '../../components/Cards';

import {styles} from './styles';

const Profile = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [phone, setPhone] = useState('');
  const [userId, setUserId] = useState(`${Crypto.randomUUID()}`);

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
    }, []),
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
    <Screen
      variant={BACKGROUND_VARIANTS.IMAGE_PROFILE}
      style={styles.container}
      safeAreaEdges={['top']}>
      <About data={{name, email, dob}} />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
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
    </Screen>
  );
};

export default Profile;

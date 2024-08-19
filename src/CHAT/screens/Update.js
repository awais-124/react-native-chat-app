import {
  StyleSheet,
  View,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useState} from 'react';

import firestore from '@react-native-firebase/firestore';
import DatePicker from 'react-native-date-picker';

import COLORS from '../../AUTH/styles/colors';

import Loader from '../../AUTH/components/Loader';
import CustomHeader from '../components/CustomHeader';
import BtnSimple from '../../AUTH/components/BtnSimple';
import DateInput from '../../AUTH/components/DateInput';
import LabelledInput from '../../AUTH/components/LabelledInput';
import CustomStatusBar from '../../AUTH/components/CustomStatusBar';

import FLEX from '../../AUTH/styles/flex';

import ICONS from '../../AUTH/helpers/icons';
import CONSTANTS from '../../AUTH/helpers/CONSTANTS';

import StorageService from '../../AUTH/utils/StorageHelper';
import {screen_height, screen_width} from '../../AUTH/utils/Dimensions';

const {secondary: s, primary: p} = COLORS;

const Update = ({navigation, route}) => {
  const data = route.params.data;
  const [name, setName] = useState(data.name);
  const [email, setEmail] = useState(data.email);
  const [phone, setPhone] = useState(data.phone);
  const [date, setDate] = useState(new Date(data.dob));
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleName = val => setName(val);
  const handleEmail = val => setEmail(val);
  const handlePhone = val => setPhone(val);
  const handleDatePicker = () => setOpen(true);

  const handleEditSubmission = async () => {
    if (name.length === '' || phone.length === '' || email.length === '') {
      Alert.alert('Empty Fields', 'Input fields cannot be empty!');
      return;
    }

    let message = !CONSTANTS.emailRegex.test(email)
      ? 'Email not valid'
      : 'Invalid Phone Number. Must be longer than 9 characters';

    if (!(CONSTANTS.emailRegex.test(email) && phone.length > 9)) {
      Alert.alert('Error', message);
      return;
    }

    try {
      setLoading(true);
      const querySnapshot = await firestore()
        .collection('users')
        .where('email', '==', data.email)
        .get();

      const fetchedData = querySnapshot.docs[0].data();

      if (
        fetchedData.name === name &&
        fetchedData.phone === phone &&
        fetchedData.email === email &&
        CONSTANTS.formatTimestamp(fetchedData.date) === date.toISOString()
      ) {
        console.log('Comparison successful: All values match.');
        setLoading(false);
        Alert.alert(
          'No Changes Detected',
          'The data has not been modified. No update is necessary.',
        );
        return;
      }

      await firestore().collection('users').doc(fetchedData.userId).update({
        name: name,
        email: email,
        phone: phone,
        date: date,
      });
      gotoNext();

      Alert.alert('Success', 'Data updated successfully');
    } catch (error) {
      console.error('Error updating user:', error);
      setLoading(false);
    }
  };

  const gotoNext = async () => {
    await StorageService.removeItem('NAME');
    await StorageService.removeItem('EMAIL');
    await StorageService.removeItem('PHONE');
    await StorageService.removeItem('DOB');
    try {
      const querySnapshot = await firestore()
        .collection('users')
        .where('email', '==', email)
        .get();

      const fetchedData = querySnapshot.docs[0].data();
      await StorageService.saveItem('NAME', fetchedData.name);
      await StorageService.saveItem('PHONE', fetchedData.phone);
      await StorageService.saveItem('EMAIL', fetchedData.email);
      await StorageService.saveItem('DOB', JSON.stringify(fetchedData.date));
      setLoading(false);
    } catch (error) {
      console.log({error});
    }
    setLoading(false);
  };
  const onCancelDate = () => setOpen(false);
  const onConfirmDate = date => {
    setDate(date);
    setOpen(false);
  };

  return (
    <KeyboardAvoidingView style={FLEX.fill}>
      <CustomStatusBar />
      <CustomHeader
        onClick={() => navigation.goBack()}
        title="Profile Update"
      />
      {loading ? (
        <Loader />
      ) : (
        <View style={styles.container}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scroll}>
            <Image source={ICONS.AVATARBLUE} style={styles.avatar} />
            <View style={styles.form}>
              <LabelledInput label="Name" data={name} onChange={handleName} />
              <LabelledInput
                label="Email"
                data={email}
                onChange={handleEmail}
              />
              <LabelledInput
                label="Phone"
                data={phone}
                onChange={handlePhone}
              />
              <DateInput
                label="Birthday"
                onClick={handleDatePicker}
                data={date ? date.toDateString() : ''}
                disabled={false}
              />
              <DatePicker
                androidVariant="nativeAndroid"
                modal
                open={open}
                date={date || new Date()}
                mode="date"
                onConfirm={onConfirmDate}
                onCancel={onCancelDate}
                theme="dark"
                textColor={s.black}
                buttonColor={p.orange}
                title="Pick Date"
              />
              <BtnSimple
                text="Update Info"
                back={p.orange}
                color={s.white}
                onClick={handleEditSubmission}
              />
            </View>
          </ScrollView>
        </View>
      )}
    </KeyboardAvoidingView>
  );
};

export default Update;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    gap: 15,
    paddingBottom: 20,
    paddingTop: 25,
  },
  scroll: {alignItems: 'center'},
  avatar: {
    height: 90,
    width: 91,
    alignItems: 'center',
    gap: 15,
  },
  form: {
    gap: 15,
    paddingBottom: 50,
    paddingTop: 15,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: screen_height * 0.8,
    width: screen_width,
  },
});

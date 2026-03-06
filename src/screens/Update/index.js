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
import DateTimePicker from '@react-native-community/datetimepicker';

import useForm from '../../hooks/useForm';
import useUpdate from '../../hooks/useUpdate';

import COLORS from '../../constants/colors';

import DateInput from '../../components/DateInput';
import CustomStatusBar from '../../components/CustomStatusBar';
import Loader from '../../components/Loader';

import Header from '../../components/Header';
import Screen from '../../components/Screen';
import Button from '../../components/Button';
import Input from '../../components/Input';
import {theme} from '../../styles/theme';

import ICONS from '../../constants/icons';
import CONSTANTS from '../../constants/CONSTANTS';
import HANDLERS from '../../utils/handlers';

import StorageService from '../../services/StorageService';
import {screen_width} from '../../utils/Dimensions';

import {styles} from './styles';

const Update = ({navigation, route}) => {
  const data = route.params.data;
  const {values, handleChange} = useForm({
    name: data.name,
    email: data.email,
    phone: data.phone,
  });
  const {name, email, phone} = values;

  const [date, setDate] = useState(new Date(data.dob));
  const [open, setOpen] = useState(false);

  // Wrap the navigation effect through the hook onSuccess callback instead
  const {updateProfile, loading} = useUpdate(data, () => {
    // Execute when save finishes properly map to whatever is needed
  });

  const handleDatePicker = () => setOpen(true);

  const handleEditSubmission = async () => {
    await updateProfile(name, email, phone, date);
  };

  const onCancelDate = () => setOpen(false);
  const onChangeDate = (event, selectedDate) => {
    setOpen(false);
    if (selectedDate) setDate(selectedDate);
  };

  return (
    <Screen
      safeAreaEdges={['top', 'bottom']}
      hideKeyboardOnTap={true}
      style={{flex: 1, backgroundColor: theme.colors.background}}>
      <CustomStatusBar />
      <Header onBackPress={() => navigation.goBack()} title="Profile Update" />
      {loading ? (
        <Loader />
      ) : (
        <View style={styles.container}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scroll}>
            <Image source={ICONS.AVATARBLUE} style={styles.avatar} />
            <View style={styles.form}>
              <Input
                label="Name"
                value={name}
                onChangeText={val => handleChange('name', val)}
                placeholder="Your name"
              />
              <Input
                label="Email"
                value={email}
                onChangeText={val => handleChange('email', val)}
                placeholder="Your email"
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <Input
                label="Phone"
                value={phone}
                onChangeText={val => handleChange('phone', val)}
                placeholder="Phone number"
                keyboardType="phone-pad"
              />
              <DateInput
                label="Birthday"
                onClick={handleDatePicker}
                data={date ? date.toDateString() : ''}
                disabled={false}
              />
              {open && (
                <DateTimePicker
                  value={date || new Date()}
                  mode="date"
                  display="default"
                  onChange={onChangeDate}
                />
              )}
              <Button
                text="Update Info"
                onPress={handleEditSubmission}
                style={styles.btn}
              />
            </View>
          </ScrollView>
        </View>
      )}
    </Screen>
  );
};

export default Update;

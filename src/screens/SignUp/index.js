import React, {useState, useEffect} from 'react';
import {
  Alert,
  Keyboard,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';
import useForm from '../../hooks/useForm';
import useAuth from '../../hooks/useAuth';

import FLEX from '../../constants/flex';
import COLORS from '../../constants/colors';
import ASSETS from '../../constants/imports';
import FONTFAMILY from '../../constants/fonts';
import HANDLERS from '../../utils/handlers';

import CustomStatusBar from '../../components/CustomStatusBar';
import DateInput from '../../components/DateInput';
import Loader from '../../components/Loader';
import Logo from '../../components/Logo';

import Screen, {BACKGROUND_VARIANTS} from '../../components/Screen';
import Button, {BUTTON_VARIANTS} from '../../components/Button';
import Input from '../../components/Input';

import {screen_width} from '../../utils/Dimensions';

import {styles} from './styles';

/*************************              FUNCTION CODE STARTS HERE                ***********************/
const SignUp = ({navigation}) => {
  const {values, handleChange, resetForm} = useForm({
    name: '',
    email: '',
    phone: '',
    pass: '',
    confirmPass: '',
  });
  const {name, email, phone, pass, confirmPass} = values;
  const {
    signUp,
    signInWithGoogle,
    loading: visible,
    errorMsg,
    setErrorMsg,
  } = useAuth();

  const [date, setDate] = useState(null);
  const [open, setOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleInputChange = (field, val) => {
    handleChange(field, val);
    setErrorMsg('');
  };
  const handleDatePicker = () => {
    setOpen(true);
    setErrorMsg('');
  };

  const onCancelDate = () => setOpen(false);
  const onChangeDate = (event, selectedDate) => {
    setOpen(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const clearInputs = () => {
    setDate('');
    resetForm();
  };

  const goToSignIn = async () => {
    clearInputs();
    await navigation.navigate('SignIn');
  };

  const handleFormSubmission = async () => {
    setErrorMsg('');
    const {message, isValid} = await HANDLERS.handleFormValidity(
      email,
      pass,
      confirmPass,
      phone,
      name,
      date,
    );

    if (isValid) {
      signUp(
        {
          email,
          phone,
          name,
          pass,
          date,
        },
        () => {
          Alert.alert(
            'Success',
            'Sign Up successful! Generating keys might take a moment. Welcome to CipherChat.',
            [{text: 'Continue', onPress: () => {}}],
          );
        },
      );
    } else {
      setErrorMsg(message);
    }
  };

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setIsFocused(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setIsFocused(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return (
    <Screen variant={BACKGROUND_VARIANTS.IMAGE_SIGNUP} hideKeyboardOnTap={true}>
      <View style={[FLEX.fill, styles.container]}>
        {visible && <Loader />}
        <CustomStatusBar />
        {!isFocused && (
          <View style={styles.header}>
            <Logo style={[styles.logo]} />
          </View>
        )}
        <ScrollView style={styles.form}>
          <View style={[FLEX.justifyCentered, styles.formBody]}>
            <Text style={styles.formH1}>Sign Up</Text>
            <Input
              label="Name"
              value={name}
              onChangeText={val => handleInputChange('name', val)}
              placeholder="Enter your full name"
            />
            <Input
              label="Phone Number"
              value={phone}
              keyboardType="phone-pad"
              onChangeText={val => handleInputChange('phone', val)}
              placeholder="Enter your phone"
            />
            <Input
              label="Email Address"
              value={email}
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={val => handleInputChange('email', val)}
              placeholder="Enter your email"
            />
            <Input
              label="Password"
              value={pass}
              secureTextEntry
              onChangeText={val => handleInputChange('pass', val)}
              placeholder="Create a password"
            />
            <Input
              label="Confirm Password"
              value={confirmPass}
              secureTextEntry
              onChangeText={val => handleInputChange('confirmPass', val)}
              placeholder="Repeat password"
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
            {errorMsg ? <Text style={styles.errorText}>{errorMsg}</Text> : null}
            <Button text="Sign Up" onPress={handleFormSubmission} />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 10,
                width: '100%',
              }}>
              <View
                style={{flex: 1, height: 1, backgroundColor: COLORS.grey.base}}
              />
              <Text
                style={{
                  width: 50,
                  textAlign: 'center',
                  color: COLORS.grey.dark,
                }}>
                OR
              </Text>
              <View
                style={{flex: 1, height: 1, backgroundColor: COLORS.grey.base}}
              />
            </View>

            <Button
              text="Sign in with Google"
              variant={BUTTON_VARIANTS.SECONDARY}
              onPress={() => signInWithGoogle()}
              disabled={visible}
            />

            <View style={styles.footer}>
              <Text style={styles.footerText}>Already have an account?</Text>
              <TouchableOpacity onPress={goToSignIn}>
                <Text style={styles.pressable}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </Screen>
  );
};
/*************************              FUNCTION CODE ENDS HERE                ***********************/

export default SignUp;

import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from 'react-native';

import firestore from '@react-native-firebase/firestore';

import Logo from '../components/Logo';
import Loader from '../components/Loader';
import BtnSimple from '../components/BtnSimple';
import ScreenWrapper from '../components/ScreenWrapper';
import LabelledInput from '../components/LabelledInput';
import CustomStatusBar from '../components/CustomStatusBar';

import FLEX from '../styles/flex';
import COLORS from '../styles/colors';
import ASSETS from '../helpers/imports';
import FONTS from '../styles/typography';
import FONTFAMILY from '../styles/fonts';
import CONSTANTS from '../helpers/CONSTANTS';
import StorageService from '../utils/StorageHelper';

import SHA from '../../Security/SHA';

import {screen_height, screen_width} from '../utils/Dimensions';
const {COMFORTAA: com, MONTSERRAT: mon, POPPINS: pop} = FONTFAMILY;
const {primary: p, secondary: s} = COLORS;

const Home = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);
  const {navigate} = navigation;

  const handlePass = pass => setPassword(pass);
  const handleEmail = email => setEmail(email);

  const navigateForward = name => {
    setPassword('');
    setEmail('');
    navigate(name);
  };

  const submitForm = () => {
    const isEmpty = email.length === 0 || password.length === 0;
    const formIsValid =
      !isEmpty && CONSTANTS.emailRegex.test(email) && password.length > 5;
    let message = isEmpty
      ? 'Email and Password cannot be empty'
      : !CONSTANTS.emailRegex.test(email)
      ? 'Not a valid email'
      : 'Password is less than 6 characters';

    if (formIsValid) signInUser();
    else Alert.alert('Error', message);
  };

  const signInUser = async () => {
    try {
      console.log('ENTERED TRY BLOCK');
      setVisible(true);
      const querySnapshot = await firestore()
        .collection('users')
        .where('email', '==', email)
        .get();
      if (querySnapshot.docs.length !== 0) {
        console.log('FETCHED DATA');
        setVisible(false);
        const fetchedData = querySnapshot.docs[0].data();
        const hashMatches = await SHA.matchHash(
          password + fetchedData.userId,
          fetchedData.password,
        );
        if (hashMatches) {
          gotoNext(
            fetchedData.name,
            fetchedData.email,
            fetchedData.userId,
            fetchedData.phone,
            fetchedData.date,
            fetchedData.contacts || [],
            fetchedData.privateKey,
            fetchedData.publicKey,
          );
        } else {
          setVisible(false);
          Alert.alert(
            'Wrong Password',
            'The password you entered is incorrect!',
          );
        }
      } else {
        setVisible(false);
        Alert.alert(
          'Not Found',
          'There is no account with email you provided!',
        );
      }
    } catch (error) {
      setVisible(false);
      Alert.alert('Error', 'Something went wrong!');
      console.log(error);
    }
  };

  const gotoNext = async (
    name,
    email,
    userId,
    phone,
    date,
    contacts,
    privateKey,
    publicKey,
  ) => {
    await StorageService.saveItem('NAME', name);
    await StorageService.saveItem('EMAIL', email);
    await StorageService.saveItem('USERID', userId);
    await StorageService.saveItem('PHONE', phone);
    await StorageService.saveItem('DOB', JSON.stringify(date));
    await StorageService.saveObject("CONTACTS_LIST", contacts);
    console.log('DATE : ', date);
    const Keys = {
      private: privateKey,
      public: publicKey,
    };
    await StorageService.saveItem('KEYS', JSON.stringify(Keys));
    // await navigation.pop(1);
    await navigation.replace('Chat');
  };

  return (
    <ScreenWrapper>
      <ImageBackground source={ASSETS.SignInBack} style={[FLEX.fill]}>
        <KeyboardAvoidingView style={[FLEX.centeredFill, styles.container]}>
          <Loader shown={visible} />
          <CustomStatusBar />
          <Logo style={styles.logo} />
          <View style={[FLEX.col, FLEX.justifyCentered, styles.form]}>
            <Text style={styles.formHeading}>Sign In</Text>
            <LabelledInput
              label="Email"
              labelColor={s.greyThree}
              data={email}
              onChange={handleEmail}
            />
            <LabelledInput
              label="Password"
              labelColor={s.greyThree}
              data={password}
              onChange={handlePass}
            />
            <BtnSimple
              text="Sign In"
              back={p.orange}
              color={s.white}
              onClick={submitForm}
              style={styles.btn}
            />
            <TouchableOpacity onPress={() => navigateForward('ForgotPass')}>
              <Text style={{...FONTFAMILY.MONTSERRAT.reg.pt14}}>
                Forgot Password?
              </Text>
            </TouchableOpacity>
            <View style={[FLEX.row, {gap: 3}]}>
              <Text style={[styles.footerText, FONTS.regular.pt14]}>
                Don't have an account yet?
              </Text>
              <TouchableOpacity onPress={() => navigateForward('SignUp')}>
                <Text
                  style={[
                    {color: p.orange, fontFamily: 'Montserrat-Medium'},
                    FONTS.semibold.pt14,
                  ]}>
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </ScreenWrapper>
  );
};

export default Home;

const styles = StyleSheet.create({
  h1: {
    marginVertical: 40,
    fontSize: 30,
    color: s.white,
    fontWeight: 'bold',
  },
  logo: {
    position: 'absolute',
    top: screen_height * 0.08,
  },
  form: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: s.white,
    width: screen_width,
    height: screen_height * 0.6,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    paddingBottom: 40,
    paddingTop: 20,
  },
  /* Montserrat-ExtraBold */
  btn: {width: screen_width * 0.872},
  formHeading: {
    textTransform: 'uppercase',
    ...mon.b.pt24,
    alignSelf: 'flex-start',
    marginVertical: 8,
    marginLeft: 25,
    color: s.black,
  },
  footerText: {color: COLORS.secondary.black, ...mon.reg.pt14},
});

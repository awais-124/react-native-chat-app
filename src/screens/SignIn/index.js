import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Alert} from 'react-native';
import useForm from '../../hooks/useForm';
import useAuth from '../../hooks/useAuth';

import Logo from '../../components/Logo';
import Loader from '../../components/Loader';
import CustomStatusBar from '../../components/CustomStatusBar';

import Screen, {BACKGROUND_VARIANTS} from '../../components/Screen';
import Button, {BUTTON_VARIANTS} from '../../components/Button';
import Input from '../../components/Input';
import FLEX from '../../constants/flex';
import COLORS from '../../constants/colors';
import FONTS from '../../constants/typography';
import FONTFAMILY from '../../constants/fonts';
import CONSTANTS from '../../constants/CONSTANTS';
import StorageService from '../../services/StorageService';

import {styles} from './styles';

const {primary: p, secondary: s} = COLORS;

/*************************              FUNCTION CODE STARTS HERE                ***********************/

const Home = ({navigation}) => {
  const {values, handleChange} = useForm({email: '', password: ''});
  const {email, password} = values;
  const {
    signIn,
    signInWithGoogle,
    loading: visible,
    errorMsg,
    setErrorMsg,
  } = useAuth();

  const {navigate} = navigation;

  const navigateForward = name => {
    // Assuming useForm has a reset function or similar, otherwise this would need adjustment
    // For now, removing the individual state resets as they are no longer managed by useState
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

    if (formIsValid) {
      signIn(email, password);
    } else {
      setErrorMsg(message);
    }
  };

  return (
    <Screen variant={BACKGROUND_VARIANTS.IMAGE_SIGNIN} hideKeyboardOnTap={true}>
      <Loader shown={visible} />
      <CustomStatusBar />
      <Logo style={styles.logo} />
      <View style={[FLEX.col, FLEX.justifyCentered, styles.form]}>
        <Text style={styles.formHeading}>Sign In</Text>
        <Input
          label="Email"
          value={email}
          onChangeText={text => handleChange('email', text)}
          placeholder={'Enter your email here'}
        />
        <Input
          label="Password"
          value={password}
          onChangeText={text => handleChange('password', text)}
          secureTextEntry
          placeholder="Enter your password"
        />
        {errorMsg ? <Text style={styles.errorText}>{errorMsg}</Text> : null}
        <Button text="Sign In" onPress={submitForm} style={styles.btn} />

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
            style={{width: 50, textAlign: 'center', color: COLORS.grey.dark}}>
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

        {/* <TouchableOpacity onPress={() => navigateForward('ForgotPass')}>
              <Text style={{...FONTFAMILY.MONTSERRAT.reg.pt14}}>
              Forgot Password?
              </Text>
              </TouchableOpacity> */}
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
    </Screen>
  );
};
/*************************              FUNCTION CODE ENDS HERE                ***********************/

export default Home;

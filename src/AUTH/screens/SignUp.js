import {useState, useEffect} from 'react';
import {
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Alert,
  Keyboard,
} from 'react-native';

import DatePicker from 'react-native-date-picker';
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';

import FLEX from '../styles/flex';
import COLORS from '../styles/colors';
import ASSETS from '../helpers/imports';
import FONTFAMILY from '../styles/fonts';
import HANDLERS from '../helpers/handlers';

import CustomStatusBar from '../components/CustomStatusBar';
import ScreenWrapper from '../components/ScreenWrapper';
import LabelledInput from '../components/LabelledInput';
import DateInput from '../components/DateInput';
import BtnSimple from '../components/BtnSimple';
import Loader from '../components/Loader';
import Logo from '../components/Logo';

import algoRSA from '../../Security/RSA';
import SHA from '../../Security/SHA';

import {screen_width} from '../utils/Dimensions';

const {COMFORTAA: com, MONTSERRAT: mon, POPPINS: pop} = FONTFAMILY;
const {secondary: s, primary: p} = COLORS;

const SignUp = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [pass, setPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  const [date, setDate] = useState(null);
  const [open, setOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [visible, setVisible] = useState(false);

  const handleEmail = val => setEmail(val);
  const handleName = val => setName(val);
  const handlePass = val => setPass(val);
  const handleConfirmPass = val => setConfirmPass(val);
  const handlePhone = val => setPhone(val);
  const handleDatePicker = () => setOpen(true);

  const onCancelDate = () => setOpen(false);
  const onConfirmDate = date => {
    setDate(date);
    setOpen(false);
  };

  const clearInputs = () => {
    setDate('');
    setEmail('');
    setName('');
    setPass('');
    setConfirmPass('');
    setPhone('');
  };

  const goToSignIn = async () => {
    clearInputs();
    await navigation.navigate('SignIn');
  };

  const handleFormSubmission = async () => {
    setVisible(true);
    const {message, isValid} = await HANDLERS.handleFormValidity(
      email,
      pass,
      confirmPass,
      phone,
      name,
      date,
    );

    if (isValid) {
      try {
        const querySnapshot = await firestore()
          .collection('users')
          .where('email', '==', email)
          .get();
        console.log('EMAIL QUERY', querySnapshot);
        let errorMessage = 'User already Exists with provided email!';
        let alreadyExists = false;

        if (!querySnapshot.empty) alreadyExists = true;

        if (!alreadyExists) {
          const phoneQuery = await firestore()
            .collection('users')
            .where('phone', '==', phone)
            .get();
          if (!phoneQuery.empty) {
            alreadyExists = true;
            errorMessage = 'User already Exists with provided phone number!';
          }
        }
        const {publicKey, privateKey} = await algoRSA.generateKeyPair();
        console.log({publicKey}, {privateKey});
        if (!alreadyExists) {
          const userId = uuid.v4();
          console.log(userId);
          const passwordHash = await SHA.generateHash(pass + userId);
          console.log({passwordHash});
          await firestore().collection('users').doc(userId).set({
            userId,
            name,
            email,
            phone,
            date,
            password: passwordHash,
            privateKey,
            publicKey,
          });
          setVisible(false);
          Alert.alert('Success', 'Sign Up successful!', [
            {
              text: 'Login',
              onPress: () => goToSignIn(),
            },
          ]);
        } else {
          setVisible(false);
          Alert.alert('Error', errorMessage);
        }
      } catch (error) {
        setVisible(false);
        console.log('ERROR FROM SIGNUP ', error);
        Alert.alert('Error', 'Something Went wrong!.');
      }
    } else {
      setVisible(false);
      Alert.alert('Error', message);
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
    <ScreenWrapper>
      <ImageBackground
        source={ASSETS.SignUpBack}
        style={[FLEX.fill, styles.container]}>
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
              <LabelledInput label="Name" data={name} onChange={handleName} />
              <LabelledInput
                label="Phone Number"
                data={phone}
                onChange={handlePhone}
              />
              <LabelledInput
                label="Email Address"
                data={email}
                onChange={handleEmail}
              />
              <LabelledInput
                label="Password"
                data={pass}
                onChange={handlePass}
              />
              <LabelledInput
                label="Confirm Password"
                data={confirmPass}
                onChange={handleConfirmPass}
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
                text="Sign Up"
                back={p.orange}
                color={s.white}
                onClick={handleFormSubmission}
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
      </ImageBackground>
    </ScreenWrapper>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {justifyContent: 'space-evenly', alignItems: 'center'},
  header: {
    flex: 0.45,
    paddingTop: 3,
    width: screen_width,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  logo: {marginTop: 30, zIndex: 999},
  form: {
    flex: 0.55,
    width: screen_width,
    paddingHorizontal: 20,
    backgroundColor: COLORS.secondary.white,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
  },
  formBody: {gap: 15, paddingBottom: 50, paddingTop: 40},
  formH1: {
    color: COLORS.secondary.black,
    alignSelf: 'flex-start',
    textTransform: 'uppercase',
    ...mon.b.pt24,
    marginVertical: 8,
  },
  footer: {flexDirection: 'row', justifyContent: 'space-between', gap: 5},
  footerText: {color: COLORS.secondary.black, ...mon.reg.pt14},
  pressable: {...mon.sb.pt16, color: p.orange},
});

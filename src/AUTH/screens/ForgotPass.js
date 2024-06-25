import {useState} from 'react';

import {
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  Keyboard,
  Alert,
} from 'react-native';

import firestore from '@react-native-firebase/firestore';

import CONSTANTS from '../helpers/CONSTANTS';
import FONTFAMILY from '../styles/fonts';
import COLORS from '../styles/colors';
import ICONS from '../helpers/icons';
import FLEX from '../styles/flex';

import Modal from '../components/Modal';
import Header from '../components/Header';
import Overlay from '../components/Overlay';
import BtnSimple from '../components/BtnSimple';
import SimpleInput from '../components/SimpleInput';
import ScreenWrapper from '../components/ScreenWrapper';
import CustomStatusBar from '../components/CustomStatusBar';

import {screen_height, screen_width} from '../utils/Dimensions';
import StorageService from '../utils/StorageHelper';
import Loader from '../components/Loader';
const {COMFORTAA: com, MONTSERRAT: mon, POPPINS: pop} = FONTFAMILY;

const ForgotPass = ({navigation}) => {
  let id = '';
  const [emailIsValid, setEmailIsValid] = useState(false);
  const [email, setEmail] = useState('awais14940@gmail.com');
  const [isModalShown, setIsModalShown] = useState(false);
  const [visible, setVisible] = useState(false);

  const goBack = () => navigation.goBack();
  const isValidEmail = email => CONSTANTS.emailRegex?.test(email);
  const hideModal = () => setIsModalShown(false);

  const goToResetPassScreen = () => {
    navigation.navigate('ResetPass', {id: id || '1'});
    hideModal();
  };

  const handleEmail = inp => {
    setEmail(inp);
    setEmailIsValid(isValidEmail(inp));
  };

  const handleSubmit = () => {
    setVisible(true);
    if (emailIsValid) {
      emailCheckHandler();
    } else {
      setVisible(false);
      Alert.alert('Error', 'Plz enter a valid email!');
    }
  };

  const emailCheckHandler = async () => {
    try {
      const querySnapshot = await firestore()
        .collection('users')
        .where('email', '==', email)
        .get();
      if (querySnapshot.docs.length !== 0) {
        const fetchedData = querySnapshot.docs[0].data();
        id = fetchedData.userId;
        setVisible(false);
        await showModal();
      } else {
        setVisible(false);
        Alert.alert(
          'Not Found',
          'There is no account with email you provided!',
        );
      }
    } catch (error) {
      setVisible(false);
      Alert.alert('404', 'Something went wrong!');
      console.log('FROM FORGOT PASS SCREEN: ', error);
    }
  };

  const showModal = async () => {
    setIsModalShown(true);
    Keyboard.dismiss();
    setEmail('');
    setEmailIsValid(false);
  };

  const {primary: p, secondary: s} = COLORS;
  const backgroundColor = emailIsValid ? p.orange : s.greyFour;
  const color = emailIsValid ? s.white : s.greyTwo;

  return (
    <ScreenWrapper>
      <KeyboardAvoidingView style={[FLEX.centeredFill, styles.container]}>
        <CustomStatusBar />
        <Loader shown={visible} />
        {isModalShown && <Overlay onClick={hideModal} />}
        {isModalShown && (
          <Modal
            title="Reset"
            style={styles.modal}
            onPress={goToResetPassScreen}
            message={CONSTANTS.ModalMessage.forgotPass}
          />
        )}
        <Header goBack={goBack} />
        <View style={styles.body}>
          <Image source={ICONS.MESSAGE_BOX} style={styles.icon} />
          <View style={styles.textBox}>
            <Text style={[styles.black]}>{'Enter your Email'}</Text>
            <Text style={[styles.blackTwo]}>
              We will check for your account. Hold On!
            </Text>
          </View>
          <SimpleInput
            placeHolder="Enter Your Email"
            data={email}
            phColor={COLORS.secondary.greyTwo}
            onChange={handleEmail}
          />
        </View>
        <View style={styles.footer}>
          <BtnSimple
            text="Submit"
            back={backgroundColor}
            color={color}
            isDisabled={!emailIsValid}
            onClick={handleSubmit}
          />
        </View>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
};

export default ForgotPass;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.secondary.white,
    paddingBottom: 22,
  },
  header: {
    backgroundColor: COLORS.primary.blue,
    width: screen_width,
    marginTop: 0,
    position: 'absolute',
    top: 0,
  },
  icon: {width: screen_width * 0.15, aspectRatio: 1},
  body: {
    flex: 0.6,
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 10,
  },
  topBar: {width: '100%'},
  textBox: {gap: 8},
  black: {color: COLORS.secondary.black, textAlign: 'center', ...mon.reg.pt20},
  blackTwo: {
    color: COLORS.secondary.black,
    textAlign: 'center',
    ...mon.reg.pt14,
  },
  footer: {
    position: 'absolute',
    bottom: 10,
  },
  modal: {position: 'absolute', top: screen_height * 0.32},
});

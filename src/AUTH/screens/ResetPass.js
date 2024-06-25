import {useState, useRef} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  Keyboard,
  ScrollView,
} from 'react-native';

import Modal from '../components/Modal';
import Overlay from '../components/Overlay';
import BtnSimple from '../components/BtnSimple';
import LabelledInput from '../components/LabelledInput';
import CustomStatusBar from '../components/CustomStatusBar';

import CONSTANTS from '../helpers/CONSTANTS';
import FONTFAMILY from '../styles/fonts';
import ICONS from '../helpers/icons';
import COLORS from '../styles/colors';
import FLEX from '../styles/flex';

import {screen_height} from '../utils/Dimensions';
const {COMFORTAA: com, MONTSERRAT: mon, POPPINS: pop} = FONTFAMILY;

const ResetPass = ({navigation}) => {
  const scrollViewRef = useRef(null);
  const [isModalShown, setIsModalShown] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  const notSame = password !== confirmPass;
  const tooShort = password.length < 6;
  const btnDisabled = notSame || tooShort;

  const scrollToEnd = () => {
    if (scrollViewRef.current)
      scrollViewRef.current.scrollToEnd({animated: true});
    else console.log('CALLLED');
  };

  const passHandler = value => setPassword(value);
  const confirmPassHandler = value => setConfirmPass(value);

  const showModal = () => {
    setIsModalShown(true);
    Keyboard.dismiss();
  };
  const hideModal = () => {
    setIsModalShown(false);
    setPassword('');
    setConfirmPass('');
    navigation.navigate('SignIn');
  };

  const {primary: p, secondary: s} = COLORS;
  const backgroundColor = !btnDisabled ? p.orange : s.greyFour;
  const color = !btnDisabled ? s.white : s.greyTwo;

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      ref={scrollViewRef}
      keyboardShouldPersistTaps="handled">
      <KeyboardAvoidingView
        style={[FLEX.justifyCenteredFill, styles.container]}>
        <CustomStatusBar light={false} b={false} />
        {isModalShown && <Overlay onClick={hideModal} />}
        {isModalShown && (
          <Modal
            style={styles.modal}
            onPress={hideModal}
            message={CONSTANTS.ModalMessage.resetPass}
          />
        )}
        <View style={styles.body}>
          <Image source={ICONS.MESSAGE_BOX} />
          <View style={styles.textBox}>
            <Text style={[styles.black]}>Reset Password</Text>
            <Text style={[styles.blackTwo]}>Create Your New Password</Text>
          </View>
          <View style={styles.inputs}>
            <LabelledInput
              label="New Password"
              isPassword={true}
              data={password}
              labelColor={s.black}
              onChange={passHandler}
              onFocused={scrollToEnd}
            />
            <LabelledInput
              label="Confirm New Password"
              isPassword={true}
              data={confirmPass}
              labelColor={s.black}
              onChange={confirmPassHandler}
              onFocused={scrollToEnd}
            />
          </View>
        </View>
        <View style={styles.footer}>
          <BtnSimple
            text="reset"
            back={backgroundColor}
            color={color}
            onClick={showModal}
            isDisabled={btnDisabled}
          />
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default ResetPass;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
    backgroundColor: COLORS.secondary.white,
  },
  container: {
    backgroundColor: COLORS.secondary.white,
    paddingBottom: 10,
    paddingTop: screen_height * 0.1,
  },
  body: {
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 30,
  },
  textBox: {gap: 8},
  inputs: {gap: 10},
  black: {color: COLORS.secondary.black, textAlign: 'center', ...mon.reg.pt20},
  blackTwo: {
    color: COLORS.secondary.black,
    textAlign: 'center',
    ...mon.reg.pt16,
  },
  footer: {justifyContent: 'flex-end', marginTop: 5},
  modal: {position: 'absolute', top: screen_height * 0.32},
});

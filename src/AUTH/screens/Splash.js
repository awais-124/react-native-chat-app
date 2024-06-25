import {useEffect} from 'react';

import {StyleSheet, Text, ImageBackground} from 'react-native';

import CustomStatusBar from '../components/CustomStatusBar';
import Logo from '../components/Logo';

import StorageService from '../utils/StorageHelper';

import CONSTANTS from '../helpers/CONSTANTS';
import FONTFAMILY from '../styles/fonts';
import ASSETS from '../helpers/imports';
import COLORS from '../styles/colors';
import FLEX from '../styles/flex';

import {screen_height} from '../utils/Dimensions';
const {COMFORTAA: com, MONTSERRAT: mon, POPPINS: pop} = FONTFAMILY;


const Splash = ({navigation}) => {
  const checkLogin = async () => {
    const email = await StorageService.getItem('EMAIL');
    console.log('EMAIL FROM SPLASH: ', email);
    await navigation.replace(
      `${typeof email === 'string' ? 'Chat' : 'SignIn'}`,
    );
  };

  useEffect(() => {
    const timeoutId = setTimeout(checkLogin, CONSTANTS.SPLASH_TIMEOUT);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <ImageBackground source={ASSETS.SplashBack} style={[FLEX.centeredFill]}>
      <CustomStatusBar />
      <Logo style={FLEX.centeredFill} />
      {/* <Text style={[FONTS.semibold.pt14, styles.baseText]}> */}
      <Text style={[styles.baseText]}>Your best choice for chatting</Text>
    </ImageBackground>
  );
};

export default Splash;

const styles = StyleSheet.create({
  baseText: {
    textAlignVertical: 'bottom',
    color: COLORS.secondary.white,
    marginBottom: screen_height * 0.05,
    ...com.sb.pt14,
  },
});

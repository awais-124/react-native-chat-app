import {useEffect} from 'react';

import {StyleSheet, Text} from 'react-native';

import Screen, {BACKGROUND_VARIANTS} from '../../components/Screen';
import CustomStatusBar from '../../components/CustomStatusBar';
import Logo from '../../components/Logo';

import StorageService from '../../services/StorageService';

import CONSTANTS from '../../constants/CONSTANTS';
import ASSETS from '../../constants/imports';
import COLORS from '../../constants/colors';
import FLEX from '../../constants/flex';

import {screen_height} from '../../utils/Dimensions';
import {styles} from './styles';

/*************************              FUNCTION CODE STARTS HERE                ***********************/
const Splash = ({navigation}) => {
  const checkLogin = async () => {
    const email = await StorageService.getItem('EMAIL');
    console.log('EMAIL FROM SPLASH: ', email);
    await navigation.replace(
      `${typeof email === 'string' ? 'Chat' : 'Welcome'}`,
    );
  };

  useEffect(() => {
    const timeoutId = setTimeout(checkLogin, CONSTANTS.SPLASH_TIMEOUT);
    return () => clearTimeout(timeoutId);
  }, [checkLogin]);

  return (
    <Screen variant={BACKGROUND_VARIANTS.IMAGE_SIGNIN}>
      <CustomStatusBar />
      <Logo style={FLEX.centeredFill} />
      <Text style={[styles.baseText]}>Your best choice for chatting</Text>
    </Screen>
  );
};
/*************************              FUNCTION CODE ENDS HERE                ***********************/

export default Splash;

import {Image, StyleSheet, Text, View} from 'react-native';

import {screen_height, screen_width} from '../utils/Dimensions';

import COLORS from '../styles/colors';
import ASSETS from '../helpers/imports';
import FONTFAMILY from '../styles/fonts';

const {COMFORTAA: com, MONTSERRAT: mon, POPPINS: pop} = FONTFAMILY;
const Logo = ({style}) => {
  return (
    <View style={[styles.logoBox, style]}>
      <Image source={ASSETS.CIPHERWHITE} style={styles.logo} />
      <Text style={styles.logoText}>Cipher Chat</Text>
    </View>
  );
};

export default Logo;

const styles = StyleSheet.create({
  logoBox: {
    width: screen_width,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    height: screen_height * 0.15,
    aspectRatio: 1,
  },
  logoText: {
    color: COLORS.secondary.white,
    ...com.b.pt20,
    textTransform: 'uppercase',
  },
});

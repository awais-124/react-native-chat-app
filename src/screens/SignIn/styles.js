import {StyleSheet} from 'react-native';
import COLORS from '../../constants/colors';
import FONTS from '../../constants/typography';
import FONTFAMILY from '../../constants/fonts';
import {screen_height, screen_width} from '../../utils/Dimensions';

const {COMFORTAA: com, MONTSERRAT: mon, POPPINS: pop} = FONTFAMILY;
const {primary: p, secondary: s} = COLORS;

export const styles = StyleSheet.create({
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
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  btn: {
    width: '100%',
    marginTop: 10,
    marginBottom: 20,
  },
  formHeading: {
    textTransform: 'uppercase',
    ...mon.b.pt24,
    alignSelf: 'flex-start',
    marginVertical: 8,
    color: s.black,
  },
  errorText: {
    color: 'red',
    alignSelf: 'center',
    marginBottom: 5,
    ...mon.reg.pt14,
  },
  footerText: {color: COLORS.secondary.black, ...mon.reg.pt14},
});

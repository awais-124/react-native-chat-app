import {StyleSheet} from 'react-native';
import COLORS from '../../constants/colors';
import FONTFAMILY from '../../constants/fonts';
import {screen_width} from '../../utils/Dimensions';

const {MONTSERRAT: mon} = FONTFAMILY;
const {primary: p, secondary: s} = COLORS;

export const styles = StyleSheet.create({
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
  errorText: {
    color: 'red',
    alignSelf: 'center',
    marginBottom: 5,
    ...mon.reg.pt14,
  },
});

import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import {screen_width} from '../utils/Dimensions';
const {COMFORTAA: com, MONTSERRAT: mon, POPPINS: pop} = FONTFAMILY;

import FONTS from '../styles/typography';
import COLORS from '../styles/colors';
import ICONS from '../helpers/icons';
import FLEX from '../styles/flex';
import FONTFAMILY from '../styles/fonts';

const DateInput = ({
  labelColor,
  label,
  data = '',
  onChange,
  onClick,
  disabled = false,
}) => {
  return (
    <TouchableOpacity onPress={onClick} activeOpacity={0.6}>
      <View style={[FLEX.row, styles.container]}>
        <View style={[FLEX.col, styles.inputBox]}>
          <Text style={{color: labelColor, ...styles.label}}>{label}</Text>
          <TextInput
            style={[FONTS.semibold.pt14, styles.input]}
            value={data}
            onChangeText={onChange}
            editable={disabled}
          />
        </View>
        <TouchableOpacity onPress={onClick} style={styles.icon}>
          <Image source={ICONS.CALENDAR} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default DateInput;

const styles = StyleSheet.create({
  row: {justifyContent: 'space-between'},
  container: {
    ...FLEX.justifyCentered,
    borderWidth: 1,
    borderColor: COLORS.secondary.greyTwo,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
    height: 60,
    width: screen_width * 0.872,
  },
  icon: {padding: 5},
  inputBox: {marginVertical: 2},
  label: {
    margin: 0,
    color: COLORS.secondary.black,
    ...mon.sb.pt12,
  },
  input: {height: '80%', maxWidth: 'auto', color: COLORS.secondary.black},
});

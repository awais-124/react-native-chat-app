import {StyleSheet} from 'react-native';
import COLORS from '../../constants/colors';
import FONTFAMILY from '../../constants/fonts';
import {screen_height} from '../../utils/Dimensions';

const {COMFORTAA: com} = FONTFAMILY;

export const styles = StyleSheet.create({
  baseText: {
    textAlignVertical: 'bottom',
    color: COLORS.secondary.white,
    marginBottom: screen_height * 0.05,
    ...com.sb.pt14,
  },
});

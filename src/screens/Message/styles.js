import {StyleSheet} from 'react-native';
import COLORS from '../../constants/colors';
import FONTFAMILY from '../../constants/fonts';
import {screen_height, screen_width} from '../../utils/Dimensions';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: COLORS.chat.back,
  },
  header: {
    elevation: 5,
    width: screen_width,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '300',
    textTransform: 'uppercase',
    ...FONTFAMILY.COMFORTAA.md.pt20,
    elevation: 5,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: screen_height * 0.8,
    width: screen_width,
  },
});

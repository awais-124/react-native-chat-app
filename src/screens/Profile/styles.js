import {StyleSheet} from 'react-native';
import {screen_height, screen_width} from '../../utils/Dimensions';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: screen_height * 0.06,
    paddingBottom: 70,
  },
  scrollContent: {
    paddingVertical: 20,
  },
  scroll: {
    alignItems: 'center',
    gap: 10,
    width: screen_width,
  },
});

import {StyleSheet} from 'react-native';
import {screen_width} from '../../utils/Dimensions';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: 20,
    paddingTop: 25,
  },
  scroll: {
    alignItems: 'center',
    width: screen_width,
    paddingHorizontal: 20,
  },
  avatar: {
    height: 90,
    width: 90,
    borderRadius: 45,
    marginBottom: 20,
  },
  form: {
    width: '100%',
    paddingBottom: 50,
  },
  btn: {
    marginTop: 20,
    width: '100%',
  },
});

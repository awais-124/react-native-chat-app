import {StyleSheet} from 'react-native';
import COLORS from '../../constants/colors';

export const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: COLORS.secondary.white,
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 90,
  },
  inputWrapper: {
    backgroundColor: COLORS.secondary.white,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingTop: 16,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  inputContainer: {
    marginBottom: 0,
  },
  actionBtn: {
    marginVertical: 10,
  },
  sendIcon: {
    width: 24,
    height: 24,
    tintColor: COLORS.primary.blue,
  },
});

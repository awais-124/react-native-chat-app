import {StyleSheet} from 'react-native';
import COLORS from '../../constants/colors';

export const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: COLORS.secondary.white,
    paddingBottom: 54,
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingVertical: 23,
  },
  actionBtn: {
    marginVertical: 10,
  },
  headerIconRight: {
    width: 24,
    height: 24,
    tintColor: COLORS.secondary.white,
  },
});

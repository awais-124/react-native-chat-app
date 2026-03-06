import {StyleSheet} from 'react-native';
import COLORS from '../../constants/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.secondary.white,
  },
  contentContainer: {
    padding: 16,
  },
  cardContent: {
    paddingRight: 40,
  },
  cardIcon: {
    width: 28,
    height: 28,
    tintColor: COLORS.primary.blue,
  },
  label: {
    fontSize: 12,
    color: '#888',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    color: COLORS.secondary.black,
    fontWeight: '500',
  },
});

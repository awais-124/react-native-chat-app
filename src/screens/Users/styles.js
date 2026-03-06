import {StyleSheet} from 'react-native';
import {theme} from '../../styles/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    paddingBottom: theme.spacing.xl,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
  },
  name: {
    ...theme.typography.title,
    color: theme.colors.text,
    marginLeft: theme.spacing.md,
    textTransform: 'capitalize',
  },
  avatar: {
    height: 48,
    width: 48,
    borderRadius: 24,
  },
});

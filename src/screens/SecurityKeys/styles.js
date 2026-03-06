import {StyleSheet} from 'react-native';
import {theme} from '../../styles/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollContainer: {
    flex: 1,
  },
  scroll: {
    padding: theme.spacing.lg,
  },
  cardContent: {
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
  },
  cardIcon: {
    width: 28,
    height: 28,
    tintColor: theme.colors.primary,
  },
  label: {
    ...theme.typography.caption,
    color: theme.colors.textMuted,
    textTransform: 'uppercase',
    marginBottom: theme.spacing.xs,
  },
  value: {
    ...theme.typography.title,
    color: theme.colors.text,
  },
});

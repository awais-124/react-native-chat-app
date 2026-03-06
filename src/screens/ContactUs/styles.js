import {StyleSheet} from 'react-native';
import {theme} from '../../styles/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollViewContent: {
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
  textBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  details: {
    marginBottom: theme.spacing.xl,
    gap: theme.spacing.sm,
  },
  message: {
    ...theme.typography.body,
    color: theme.colors.textMuted,
    lineHeight: 22,
  },
  heading: {
    ...theme.typography.h2,
    color: theme.colors.text,
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

import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {theme} from '../styles/theme';

const Card = ({
  children,
  onPress,
  style,
  contentStyle,
  title,
  subtitle,
  rightAction,
  elevation = 'small',
}) => {
  const Container = onPress ? TouchableOpacity : View;
  const shadowStyle = theme.shadows[elevation] || theme.shadows.small;

  return (
    <Container
      style={[styles.card, shadowStyle, style]}
      onPress={onPress}
      activeOpacity={0.8}>
      {(title || rightAction) && (
        <View style={styles.header}>
          <View style={styles.headerText}>
            {title && <Text style={styles.title}>{title}</Text>}
            {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
          </View>
          {rightAction && <View style={styles.rightAction}>{rightAction}</View>}
        </View>
      )}
      <View style={[styles.content, contentStyle]}>{children}</View>
    </Container>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    marginVertical: theme.spacing.sm,
    padding: theme.spacing.md,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  headerText: {
    flex: 1,
  },
  title: {
    ...theme.typography.title,
    color: theme.colors.text,
  },
  subtitle: {
    ...theme.typography.caption,
    marginTop: 2,
  },
  rightAction: {
    marginLeft: theme.spacing.md,
  },
  content: {
    flexDirection: 'column',
  },
});

export default Card;

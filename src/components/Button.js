import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
  View,
} from 'react-native';
import {theme} from '../styles/theme';

export const BUTTON_VARIANTS = {
  PRIMARY: 'PRIMARY',
  SECONDARY: 'SECONDARY',
  OUTLINE: 'OUTLINE',
  GHOST: 'GHOST',
};

const Button = ({
  text,
  onPress,
  variant = BUTTON_VARIANTS.PRIMARY,
  isLoading = false,
  isDisabled = false,
  style,
  textStyle,
  leftIcon,
  rightIcon,
}) => {
  const getContainerStyle = () => {
    switch (variant) {
      case BUTTON_VARIANTS.SECONDARY:
        return [styles.container, styles.secondary];
      case BUTTON_VARIANTS.OUTLINE:
        return [styles.container, styles.outline];
      case BUTTON_VARIANTS.GHOST:
        return [styles.container, styles.ghost];
      case BUTTON_VARIANTS.PRIMARY:
      default:
        return [styles.container, styles.primary];
    }
  };

  const getTextColor = () => {
    switch (variant) {
      case BUTTON_VARIANTS.SECONDARY:
        return theme.colors.surface;
      case BUTTON_VARIANTS.OUTLINE:
      case BUTTON_VARIANTS.GHOST:
        return theme.colors.primary;
      case BUTTON_VARIANTS.PRIMARY:
      default:
        return theme.colors.surface;
    }
  };

  const disabledStyle = isDisabled ? styles.disabled : null;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled || isLoading}
      style={[getContainerStyle(), disabledStyle, style]}
      activeOpacity={0.8}>
      {isLoading ? (
        <ActivityIndicator color={getTextColor()} size="small" />
      ) : (
        <View style={styles.contentRow}>
          {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
          <Text style={[styles.text, {color: getTextColor()}, textStyle]}>
            {text}
          </Text>
          {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 56,
    borderRadius: theme.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.lg,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: theme.colors.primary,
  },
  secondary: {
    backgroundColor: theme.colors.secondary,
  },
  outline: {
    backgroundColor: theme.colors.transparent,
    borderWidth: 2,
    borderColor: theme.colors.primary,
  },
  ghost: {
    backgroundColor: theme.colors.transparent,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    ...theme.typography.button,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  leftIcon: {
    marginRight: theme.spacing.sm,
  },
  rightIcon: {
    marginLeft: theme.spacing.sm,
  },
});

export default Button;

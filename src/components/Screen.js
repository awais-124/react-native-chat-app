import React from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  ImageBackground,
  StyleSheet,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {theme} from '../styles/theme';
import ASSETS from '../constants/imports';

export const BACKGROUND_VARIANTS = {
  DEFAULT: 'DEFAULT',
  WHITE: 'WHITE',
  IMAGE_SIGNIN: 'IMAGE_SIGNIN',
  IMAGE_SIGNUP: 'IMAGE_SIGNUP',
};

const Screen = ({
  children,
  variant = BACKGROUND_VARIANTS.DEFAULT,
  style,
  safeAreaEdges = ['top', 'bottom', 'left', 'right'],
  hideKeyboardOnTap = true,
  contentContainerStyle,
}) => {
  const getBackgroundColor = () => {
    switch (variant) {
      case BACKGROUND_VARIANTS.WHITE:
        return theme.colors.surface;
      case BACKGROUND_VARIANTS.DEFAULT:
      default:
        return theme.colors.background;
    }
  };

  const isImageBackground =
    variant === BACKGROUND_VARIANTS.IMAGE_SIGNIN ||
    variant === BACKGROUND_VARIANTS.IMAGE_SIGNUP;

  const getImageSource = () => {
    if (variant === BACKGROUND_VARIANTS.IMAGE_SIGNIN) return ASSETS.SignInBack;
    if (variant === BACKGROUND_VARIANTS.IMAGE_SIGNUP) return ASSETS.SignUpBack;
    return null;
  };

  const Wrapper = hideKeyboardOnTap ? TouchableWithoutFeedback : View;
  const wrapperProps = hideKeyboardOnTap
    ? {onPress: Keyboard.dismiss, accessible: false}
    : {};

  const content = (
    <Wrapper {...wrapperProps}>
      <View style={[styles.inner, contentContainerStyle]}>{children}</View>
    </Wrapper>
  );

  const safeAreaContent = (
    <SafeAreaView
      style={[
        styles.safeArea,
        {
          backgroundColor: isImageBackground
            ? 'transparent'
            : getBackgroundColor(),
        },
        style,
      ]}
      edges={safeAreaEdges}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoid}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        {content}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );

  if (isImageBackground) {
    return (
      <ImageBackground
        source={getImageSource()}
        style={styles.imageBackground}
        resizeMode="cover">
        {safeAreaContent}
      </ImageBackground>
    );
  }

  return safeAreaContent;
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  keyboardAvoid: {
    flex: 1,
  },
  inner: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    width: '100%',
  },
});

export default Screen;

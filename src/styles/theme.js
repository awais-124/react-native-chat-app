import {Dimensions, Platform} from 'react-native';

const {width, height} = Dimensions.get('window');

const COLORS = {
  primary: '#640D6B',
  primaryLight: '#8A2D91',
  secondary: '#E65C19',
  secondaryLight: '#FA844A',
  background: '#F9F9F9',
  surface: '#FFFFFF',
  text: '#333333',
  textMuted: '#888888',
  textInverted: '#FFFFFF',
  error: '#FF4444',
  success: '#17D85C',
  warning: '#FF9900',
  border: '#E0E0E0',
  chatLeft: '#EAEAEA',
  chatRight: '#640D6B',
  transparent: 'transparent',
};

const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
};

const BORDER_RADIUS = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 20,
  round: 999,
};

const TYPOGRAPHY = {
  heading1: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 28,
    color: COLORS.text,
  },
  heading2: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 22,
    color: COLORS.text,
  },
  title: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 18,
    color: COLORS.text,
  },
  body: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: COLORS.text,
  },
  caption: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: COLORS.textMuted,
  },
  button: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    color: COLORS.textInverted,
  },
};

const SHADOWS = {
  small: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },
};

const LAYOUT = {
  window: {width, height},
  isSmallDevice: width < 375,
  flexCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flexRowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
};

export const theme = {
  colors: COLORS,
  spacing: SPACING,
  borderRadius: BORDER_RADIUS,
  typography: TYPOGRAPHY,
  shadows: SHADOWS,
  layout: LAYOUT,
};

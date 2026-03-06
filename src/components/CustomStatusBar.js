import {StatusBar} from 'react-native';

import COLORS from '../styles/colors';

const CustomStatusBar = ({light = true, b = true}) => {
  return (
    <StatusBar
      backgroundColor={b ? COLORS.primary.blue : COLORS.secondary.white}
      barStyle={light ? 'light-content' : 'dark-content'}
    />
  );
};

export default CustomStatusBar;

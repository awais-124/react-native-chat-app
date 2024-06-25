import React from 'react';

import {Keyboard, TouchableOpacity} from 'react-native';

import FLEX from '../styles/flex';

const ScreenWrapper = props => {
  return (
    <TouchableOpacity
      style={FLEX.fill}
      activeOpacity={1}
      onPress={() => Keyboard.dismiss()}>
      {props.children}
    </TouchableOpacity>
  );
};

export default ScreenWrapper;

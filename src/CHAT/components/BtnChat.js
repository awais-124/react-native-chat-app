import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';

import COLORS from '../../AUTH/styles/colors';
import FONTFAMILY from '../../AUTH/styles/fonts';

const BtnChat = ({title, handler, disabled}) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={handler}
      disabled={disabled}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default BtnChat;

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.primary.orange,
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
    height: 60,
  },
  buttonText: {
    ...FONTFAMILY.COMFORTAA.b.pt14,
    color: COLORS.secondary.white,
  },
});

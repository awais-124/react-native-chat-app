import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';

import ICONS from '../../AUTH/helpers/icons';
import COLORS from '../../AUTH/styles/colors';
import FONTFAMILY from '../../AUTH/styles/fonts';

const StyledInput = ({message, setter, handler}) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        value={message}
        onChangeText={setter}
        placeholder="Type your message here"
        multiline
      />
      <TouchableOpacity onPress={handler}>
        <Image source={ICONS.SEND} />
      </TouchableOpacity>
    </View>
  );
};

export default StyledInput;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.secondary.white,
    borderRadius: 30,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.secondary.greyFour,
    elevation: 5, // For Android shadow
    shadowColor: '#000', // For iOS shadow
    shadowOffset: {width: 0, height: 2}, // For iOS shadow
    shadowOpacity: 0.8, // For iOS shadow
    shadowRadius: 2, // For iOS shadow
    zIndex: 10,
  },
  input: {
    flex: 1,
    ...FONTFAMILY.MONTSERRAT.reg.pt16,
    color: COLORS.secondary.black,
  },
});

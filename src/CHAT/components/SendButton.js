import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';

import ICONS from '../../AUTH/helpers/icons';
import COLORS from '../../AUTH/styles/colors';
import FONTFAMILY from '../../AUTH/styles/fonts';

import {screen_width} from '../../AUTH/utils/Dimensions';

import {InputToolbar} from 'react-native-gifted-chat';

const SendButton = props => {
  const [text, setText] = React.useState('');

  const handleSend = () => {
    if (text.trim().length > 0) {
      onSend([
        {
          text,
          user: {_id: 1},
          createdAt: new Date(),
          _id: Math.random().toString(36).substr(2, 9),
        },
      ]);
      setText('');
    }
  };
  /* <View style={styles.inputToolbarContainer}>
        <TextInput
          style={styles.textInput}
          value={text}
          onChangeText={setText}
          placeholder="Type a message..."
          placeholderTextColor={COLORS.secondary.white}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Image source={ICONS.SEND} />
        </TouchableOpacity>
      </View> */
  return (
    <View style={styles.inputToolbarContainer}>
      <TextInput
        style={styles.textInput}
        value={text}
        onChangeText={setText}
        placeholder="Type a message..."
        placeholderTextColor={COLORS.secondary.white}
      />
      <TouchableOpacity style={styles.sendButton} onPress={props.onSend}>
        <Image source={ICONS.SEND} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  defaultInput: {height: 90},
  inputToolbarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  inputView: {
    alignSelf: 'flex-start',
    width: screen_width * 0.75,
  },
  textInput: {
    flex: 1,
    height: 30,
    paddingHorizontal: 10,
    width: '100%',
    height: '100%',
    ...FONTFAMILY.MONTSERRAT.reg.pt12,
  },
  sendButton: {
    marginLeft: 10,
  },
  sendButtonText: {
    color: '#007AFF',
    fontSize: 16,
  },
});

export default SendButton;

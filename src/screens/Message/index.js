import {useState, useEffect, useCallback} from 'react';

import {
  StyleSheet,
  View,
  StatusBar,
  ActivityIndicator,
  Alert,
  Keyboard,
} from 'react-native';

import {useRoute} from '@react-navigation/native';
import Header from '../../components/Header';
import BaseChat from '../../components/BaseChat';
import useChat from '../../hooks/useChat';

import COLORS from '../../constants/colors';

import {screen_height, screen_width} from '../../utils/Dimensions';

import {styles} from './styles';

const Message = ({navigation}) => {
  const route = useRoute();
  const senderId = route.params?.id;
  const receiverId = route.params?.receiver.userId;
  const receiverName = route.params?.receiver.name;
  const publicKey = route.params?.receiver.publicKey;

  if (typeof publicKey !== 'string') {
    Alert.alert('Error', 'Contact Keys not set');
  }

  const {messages, loading, onSend} = useChat(senderId, receiverId, publicKey);

  const sendMessage = msgs => {
    Keyboard.dismiss();
    onSend(msgs);
  };

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={COLORS.primary.blue}
        barStyle="light-content"
      />
      <Header
        name={receiverName}
        goBack={navigation.goBack}
        goToContact={() => navigation.navigate('Contact', {id: receiverId})}
      />
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary.blue} />
        </View>
      ) : (
        <BaseChat messages={messages} onSend={sendMessage} userId={senderId} />
      )}
    </View>
  );
};

export default Message;

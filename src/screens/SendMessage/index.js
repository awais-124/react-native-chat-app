import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Keyboard,
  Alert,
  Image,
} from 'react-native';

import firestore from '@react-native-firebase/firestore';
import * as Crypto from 'expo-crypto';

import Header from '../../components/Header';
import Input from '../../components/Input';
import Button, {BUTTON_VARIANTS} from '../../components/Button';
import SmallLoader from '../../components/SmallLoader';
import TextBox from '../../components/TextBox';

import algoRSA from '../../utils/crypto/RSA';
import AES from '../../utils/crypto/AES';

import COLORS from '../../constants/colors';
import ICONS from '../../constants/icons';

import {styles} from './styles';

const SendMessage = ({navigation, route}) => {
  const ids = route.params.ids;
  const sender = ids.senderId;
  const receiver = ids.receiverId;
  const sendingId = `${sender}_${receiver}`;

  const [receiverName, setReceiverName] = useState('');
  const [message, setMessage] = useState('');
  const [messageTwo, setMessageTwo] = useState('');
  const [encryptedMessage, setEncryptedMessage] = useState('');
  const [aesKey, setAesKey] = useState('');
  const [encryptedAesKey, setEncryptedAesKey] = useState('');
  const [receiverPublicKey, setReceiverPublicKey] = useState('');
  const [loading, setLoading] = useState(false);

  const goBack = () => navigation.goBack();

  useEffect(() => {
    const fetchReceiverKeys = async () => {
      const receiverKeysDoc = await firestore()
        .collection('users')
        .doc(receiver)
        .get();
      const receiverKeys = receiverKeysDoc.data();
      setReceiverName(receiverKeys.name);
      setReceiverPublicKey(receiverKeys.publicKey);
      console.log(receiverKeys.publicKey);
    };
    fetchReceiverKeys();
  }, []);

  const handleSend = async () => {
    const uniqueId = Crypto.randomUUID();
    const myMsg = {
      _id: uniqueId,
      text: encryptedMessage,
      createdAt: new Date(),
      metadata: {key: encryptedAesKey},
    };

    try {
      await firestore()
        .collection('encryption')
        .doc(sendingId)
        .collection('messages')
        .add(myMsg);

      setAesKey('');
      setEncryptedAesKey('');
      setMessage('');
      setEncryptedMessage('');
      setMessageTwo('');

      const backToEncryption = () => navigation.goBack();
      Alert.alert('Success', 'Message sent successfully!', [
        {text: 'OK', onPress: backToEncryption},
      ]);
    } catch (error) {
      console.log('ERROR while sending message from SENDMESSAGE : ', error);
      Alert.alert('Message not sent', 'Something went wrong!');
    }
  };

  const handleEncrypt = () => {
    setEncryptedAesKey('');
    const aesKeyTemp = AES.generateKey();
    console.log({messageTwo, aesKeyTemp});
    const encryptedMessageTemp = AES.encrypt(messageTwo, aesKeyTemp);
    console.log({encryptedMessageTemp});
    setAesKey(aesKeyTemp);
    setEncryptedMessage(encryptedMessageTemp);
  };

  const handleEncryptKey = async () => {
    setLoading(true);
    const encryptedAesKeyTemp = await algoRSA.encryptSingle(
      receiverPublicKey,
      aesKey,
    );
    setEncryptedAesKey(encryptedAesKeyTemp);
    setLoading(false);
  };

  const handleSubmitMessage = () => {
    Keyboard.dismiss();
    if (!message.length) return;
    setAesKey('');
    setEncryptedMessage('');
    setEncryptedAesKey('');
    setMessageTwo(message);
    setMessage('');
  };

  return (
    <View style={styles.outerContainer}>
      <Header onBackPress={goBack} title={receiverName} />
      <ScrollView contentContainerStyle={styles.container}>
        {messageTwo ? (
          <>
            <TextBox
              text={messageTwo}
              heading="Message"
              icon={ICONS.MESSAGE_ORANGE}
            />
            <Button
              text="Encrypt"
              onPress={handleEncrypt}
              isDisabled={!messageTwo || loading}
              style={styles.actionBtn}
            />
          </>
        ) : null}
        {encryptedMessage ? (
          <>
            <TextBox
              heading={`Encrypted Message`}
              text={`${encryptedMessage}`}
              icon={ICONS.CIPHER}
            />
            <TextBox
              heading={`AES Key`}
              text={`${aesKey}`}
              icon={ICONS.ENCRYPTION_KEY}
            />
            <Button
              text="Encrypt AES Key"
              onPress={handleEncryptKey}
              isDisabled={!messageTwo || loading}
              isLoading={loading}
              style={styles.actionBtn}
            />
          </>
        ) : null}
        {encryptedAesKey && !loading && (
          <>
            <TextBox
              heading={`Encrypted Aes Key`}
              text={`${encryptedAesKey}`}
              icon={ICONS.ENCRYPTION_KEY}
            />
            <TextBox
              text={`${receiverPublicKey}`}
              heading={`Receiver's Public Key`}
              icon={ICONS.PUBLIC_KEY}
            />
            <Button
              text="Send"
              onPress={handleSend}
              isDisabled={!messageTwo || loading}
              isLoading={loading}
              style={styles.actionBtn}
              variant={BUTTON_VARIANTS.SECONDARY}
            />
          </>
        )}
        {loading && <SmallLoader />}
      </ScrollView>
      <View style={styles.inputWrapper}>
        <Input
          value={message}
          onChangeText={setMessage}
          placeholder="Type your message..."
          rightIcon={
            <Image
              source={ICONS.RIGHTY}
              style={styles.sendIcon}
              resizeMode="contain"
            />
          }
          onRightIconPress={handleSubmitMessage}
          containerStyle={styles.inputContainer}
        />
      </View>
    </View>
  );
};

export default SendMessage;

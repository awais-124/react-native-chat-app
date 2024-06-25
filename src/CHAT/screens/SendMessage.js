import React, {useState, useEffect} from 'react';
import {StyleSheet, ScrollView, View, Keyboard, Alert} from 'react-native';

import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';

import StyledInput from '../components/StyledInput';
import SmallLoader from '../components/SmallLoader';
import BtnChat from '../components/BtnChat';
import TextBox from '../components/TextBox';

import algoRSA from '../../Security/RSA';
import AES from '../../Security/AES';

import COLORS from '../../AUTH/styles/colors';
import CustomHeader from '../components/CustomHeader';
import ICONS from '../../AUTH/helpers/icons';

const SendMessage = ({navigation, route}) => {
  const ids = route.params.ids;
  const sender = ids.senderId;
  const receiver = ids.receiverId;
  const sendingId = `${sender}_${receiver}`;

  const [receiverName, setReceiverName] = useState("");
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
    const uniqueId = uuid.v4();
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
    // Logic for AES encryption will be added later
    setEncryptedAesKey('');
    const aesKeyTemp = AES.generateKey();
    console.log({messageTwo, aesKeyTemp});
    const encryptedMessageTemp = AES.encrypt(messageTwo, aesKeyTemp);
    console.log({encryptedMessageTemp});
    setAesKey(aesKeyTemp);
    setEncryptedMessage(encryptedMessageTemp);
  };

  const handleEncryptKey = async () => {
    // Logic for encrypting AES key with receiver's public key will be added later
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
      <CustomHeader onClick={goBack} title={receiverName} />
      <ScrollView contentContainerStyle={styles.container}>
        {messageTwo ? (
          <>
            <TextBox
              text={messageTwo}
              heading="Message"
              icon={ICONS.MESSAGE_ORANGE}
            />
            <BtnChat
              title="Encrypt"
              handler={handleEncrypt}
              disabled={!messageTwo || loading}
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
            <BtnChat
              title="Encrypt AES Key"
              handler={handleEncryptKey}
              disabled={!messageTwo || loading}
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
            <BtnChat
              title="Send"
              handler={handleSend}
              disabled={!messageTwo || loading}
            />
          </>
        )}
        {loading && <SmallLoader />}
      </ScrollView>
      <View style={styles.inputWrapper}>
        <StyledInput
          message={message}
          setter={setMessage}
          handler={handleSubmitMessage}
        />
      </View>
    </View>
  );
};

export default SendMessage;

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: COLORS.secondary.white,
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 90,
  },
  inputWrapper: {
    backgroundColor: COLORS.secondary.white,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 10,
    paddingTop: 10,
    elevation: 5, // For Android shadow
    zIndex: 10,
  },
});


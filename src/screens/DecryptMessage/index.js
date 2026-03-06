import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableWithoutFeedback,
  Image,
  StatusBar,
} from 'react-native';

import Header from '../../components/Header';
import Button, {BUTTON_VARIANTS} from '../../components/Button';
import TextBox from '../../components/TextBox';
import SmallLoader from '../../components/SmallLoader';

import algoRSA from '../../utils/crypto/RSA';
import AES from '../../utils/crypto/AES';

import COLORS from '../../constants/colors';
import CONSTANTS from '../../constants/CONSTANTS';
import FONTFAMILY from '../../constants/fonts';

import {screen_width} from '../../utils/Dimensions';
import StorageService from '../../services/StorageService';
import HANDLERS from '../../utils/helpers';

import ICONS from '../../constants/icons';

import {styles} from './styles';

const DecryptMessage = ({navigation, route}) => {
  const {encryptedMessage, encryptedAesKey, date, user, sender, receiver} =
    route?.params?.data;
  const [aesKey, setAesKey] = useState('');
  const [decryptedMessage, setDecryptedMessage] = useState('');
  const [prvKey, setPrvKey] = useState('');
  const [aesKeyDecrypted, setAesKeyDecrypted] = useState(false);
  const [messageDecrypted, setMessageDecrypted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const Keys = await StorageService.getItem('KEYS');
        const obj = Keys ? JSON.parse(Keys) : null;
        const prv = obj?.private;
        setPrvKey(prv);
      } catch (error) {
        console.error('Error fetching private key:', error);
      }
    };
    fetchData();
  }, []);

  const handleDecryptAesKey = async () => {
    try {
      setMessageDecrypted(false);
      setAesKeyDecrypted(false);
      setLoading(true);
      const decryptedAesKey = await algoRSA.decryptSingle(
        prvKey,
        encryptedAesKey,
      );
      setAesKey(decryptedAesKey);
      setAesKeyDecrypted(true);
    } catch (error) {
      console.error('Error decrypting AES key:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDecryptMessage = () => {
    try {
      const decryptedMessageTemp = AES.decrypt(encryptedMessage, aesKey);
      setDecryptedMessage(decryptedMessageTemp);
      setMessageDecrypted(true);
    } catch (error) {
      console.error('Error decrypting message:', error);
    }
  };

  const handleBack = () => navigation.goBack();
  const goToSendMessage = () => {
    const data = {
      receiverId: receiver,
      senderId: sender,
    };
    navigation.navigate('SendMessage', {ids: data});
  };

  return (
    <View style={styles.outerContainer}>
      <StatusBar
        backgroundColor={COLORS.primary.blue}
        barStyle="light-content"
      />
      <Header
        title={`From ${user}`}
        onBackPress={handleBack}
        rightAction={
          <TouchableWithoutFeedback onPress={goToSendMessage}>
            <Image source={ICONS.RIGHTY} style={styles.headerIconRight} />
          </TouchableWithoutFeedback>
        }
      />
      <View style={styles.user}>
        <Text style={styles.title}>
          {`Received at ${HANDLERS.convertTimestampToDate(date)}`}
        </Text>
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        <TextBox
          heading="Encrypted Message"
          text={encryptedMessage}
          icon={ICONS.CIPHER}
        />
        <TextBox
          heading="Encrypted AES Key"
          text={encryptedAesKey}
          icon={ICONS.ENCRYPTION_KEY}
        />
        <Button
          text="Decrypt AES Key"
          onPress={handleDecryptAesKey}
          isDisabled={loading || aesKeyDecrypted}
          isLoading={loading && !aesKeyDecrypted}
          style={styles.actionBtn}
        />
        {aesKeyDecrypted && (
          <>
            <TextBox heading="Decrypted AES Key" text={aesKey} />
            <TextBox
              heading="Private Key"
              text={HANDLERS.obfuscateKey(prvKey)}
            />
            <Button
              text="Decrypt Message"
              onPress={handleDecryptMessage}
              isDisabled={loading || messageDecrypted}
              isLoading={loading && !messageDecrypted}
              style={styles.actionBtn}
              variant={BUTTON_VARIANTS.SECONDARY}
            />
          </>
        )}
        {messageDecrypted && (
          <TextBox
            heading="Decrypted Message"
            text={decryptedMessage}
            icon={ICONS.MESSAGE_ORANGE}
          />
        )}
        {loading && <SmallLoader />}
      </ScrollView>
    </View>
  );
};

export default DecryptMessage;

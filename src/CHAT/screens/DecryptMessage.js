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

import BtnChat from '../components/BtnChat';
import TextBox from '../components/TextBox';
import SmallLoader from '../components/SmallLoader';

import algoRSA from '../../Security/RSA';
import AES from '../../Security/AES';

import COLORS from '../../AUTH/styles/colors';
import CONSTANTS from '../../AUTH/helpers/CONSTANTS';
import FONTFAMILY from '../../AUTH/styles/fonts';

import {screen_width} from '../../AUTH/utils/Dimensions';
import StorageService from '../../AUTH/utils/StorageHelper';
import CustomHeader from '../components/CustomHeader';
import ICONS from '../../AUTH/helpers/icons';

const DecryptMessage = ({navigation, route}) => {
  const {encryptedMessage, encryptedAesKey, date, user, sender, receiver} = route?.params?.data;
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
      <View style={styles.floating}>
        <TouchableWithoutFeedback onPress={handleBack}>
          <Image source={ICONS.LEFTY} style={styles.footerIcons} />
        </TouchableWithoutFeedback>
        <Text style = {styles.footerText}>{`BACK                                            REPLY`}</Text>
        <TouchableWithoutFeedback onPress={goToSendMessage}>
          <Image source={ICONS.RIGHTY} style={styles.footerIcons} />
        </TouchableWithoutFeedback>
      </View>
      <View style={styles.user}>
        <Text
          style={
            styles.title
          }>{`Received from ${user} at ${CONSTANTS.convertTimestampToDate(
          date,
        )}`}</Text>
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
        <BtnChat
          title="Decrypt AES Key"
          handler={handleDecryptAesKey}
          disabled={loading || aesKeyDecrypted}
        />
        {aesKeyDecrypted && (
          <>
            <TextBox heading="Decrypted AES Key" text={aesKey} />
            <TextBox
              heading="Private Key"
              text={CONSTANTS.obfuscateKey(prvKey)}
            />
            <BtnChat
              title="Decrypt Message"
              handler={handleDecryptMessage}
              disabled={loading || messageDecrypted}
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

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: COLORS.secondary.white,
    paddingBottom: 54,
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingVertical: 23,
  },
  floating: {
    position: 'absolute',
    bottom: 0,
    width: screen_width,
    backgroundColor: COLORS.primary.blue,
    paddingHorizontal: 25,
    paddingVertical: 15,
    elevation: 10,
    zIndex: 999,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  user: {
    width: screen_width,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary.blue,
    gap: 10,
    paddingHorizontal: 20,
  },
  title: {
    color: COLORS.secondary.white,
    ...FONTFAMILY.MONTSERRAT.reg.pt14,
    textAlign: 'center',
  },
  footerIcons: { width: 30, height: 30, tintColor: COLORS.primary.orange },
  footerText:{ color: COLORS.primary.orange, ...FONTFAMILY.MONTSERRAT.reg.pt14 }
});

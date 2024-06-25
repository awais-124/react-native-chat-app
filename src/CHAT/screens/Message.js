import {useState, useEffect, useCallback} from 'react';

import {
  StyleSheet,
  View,
  StatusBar,
  ActivityIndicator,
  Alert,
  Keyboard,
} from 'react-native';

import {GiftedChat, Bubble, InputToolbar, Send} from 'react-native-gifted-chat';

import {useRoute} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

import Header from '../components/Header';

import FONTFAMILY from '../../AUTH/styles/fonts';
import COLORS from '../../AUTH/styles/colors';

import algoRSA from '../../Security/RSA';
import AES from '../../Security/AES';

import StorageService from '../../AUTH/utils/StorageHelper';
import {screen_height, screen_width} from '../../AUTH/utils/Dimensions';

const Message = ({navigation}) => {
  const [messages, setMessages] = useState([]);
  const [privateKey, setPrivateKey] = useState('');
  const [senderPublicKey, setSenderPublicKey] = useState('');
  const [loading, setLoading] = useState(false); // Loading state to handle UI while decrypting

  const route = useRoute();
  const senderId = route.params?.id;
  const receiverId = route.params?.receiver.userId;
  const receiverName = route.params?.receiver.name;
  const publicKey = route.params?.receiver.publicKey;

  // const {
  //   params: {
  //     id: senderId,
  //     receiver: {userId: receiverId, name: receiverName, publicKey} = {},
  //   } = {},
  // } = useRoute();

  useEffect(() => {
    const getMyPrivateKey = async () => {
      const temp = await StorageService.getItem('KEYS');
      const keys = JSON.parse(temp);
      setPrivateKey(keys.private);
      setSenderPublicKey(keys.public);
    };

    getMyPrivateKey();
  }, []);

  if (typeof publicKey !== 'string' || typeof privateKey !== 'string') {
    Alert.alert('Error', 'Keys not set');
  }

  const sender = `${senderId}_${receiverId}`;
  const receiver = `${receiverId}_${senderId}`;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const subscriber = firestore()
        .collection('chats')
        .doc(sender)
        .collection('messages')
        .orderBy('createdAt', 'desc');

      const unsubscribe = subscriber.onSnapshot(async querySnapshot => {
        const messageMap = new Map(messages.map(msg => [msg._id, msg])); // Use Map to track unique messages
        const newMessagesPromises = querySnapshot.docs.map(async doc => {
          if (!messageMap.has(doc.id)) {
            const firebaseData = doc.data();
            const encryptedAESKeys = firebaseData.metadata.key;

            try {
              const aesKey = await algoRSA.decryptMessage(
                privateKey,
                encryptedAESKeys,
              );
              if (!aesKey) throw new Error('AES KEY NOT DECRYPTED');

              const clearText = AES.decrypt(firebaseData.text, aesKey);

              const newMessage = {
                _id: doc.id,
                text: clearText,
                createdAt: firebaseData.createdAt.toDate(),
                user: firebaseData.user,
              };

              messageMap.set(newMessage._id, newMessage);
            } catch (error) {
              console.error('Decryption Error', error);

              const newMessage = {
                _id: doc.id,
                text: 'Decryption Error',
                createdAt: firebaseData.createdAt.toDate(),
                user: firebaseData.user,
              };

              messageMap.set(newMessage._id, newMessage);
            }
          }
        });

        await Promise.all(newMessagesPromises);
        const sortedMessages = Array.from(messageMap.values()).sort(
          (a, b) => b.createdAt - a.createdAt,
        );
        setMessages(sortedMessages);
        setLoading(false);
      });

      return unsubscribe;
    };

    if (privateKey) {
      fetchData();
    }
  }, [senderId, receiverId, privateKey]);

  const onSend = useCallback(
    async (messages = []) => {
      Keyboard.dismiss();
      const message = messages[0];
      const aesKey = AES.generateKey();
      const encryptedMessage = AES.encrypt(message.text, aesKey);
      const keys = await StorageService.getItem('KEYS');
      const parsedKeys = JSON.parse(keys);
      const encryptedAESKeys = await algoRSA.encryptMessage(
        [publicKey, parsedKeys.public],
        aesKey,
      );

      const myMsg = {
        _id: message._id,
        text: encryptedMessage,
        createdAt: new Date(),
        user: {_id: senderId},
        metadata: {key: encryptedAESKeys},
      };

      try {
        await firestore()
          .collection('chats')
          .doc(sender)
          .collection('messages')
          .add(myMsg);

        await firestore()
          .collection('chats')
          .doc(receiver)
          .collection('messages')
          .add(myMsg);
      } catch (error) {
        console.log('ON SEND: ', error);
      }
    },
    [senderId, receiverId, publicKey],
  );

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
        <GiftedChat
          messages={messages}
          onSend={messages => onSend(messages)}
          user={{_id: senderId}}
          renderBubble={props => (
            <Bubble
              {...props}
              wrapperStyle={styles.bubbleWrapper}
              containerStyle={styles.bubbleContainer}
            />
          )}
        />
      )}
    </View>
  );
};

export default Message;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: COLORS.chat.back,
  },
  header: {
    elevation: 5,
    width: screen_width,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '300',
    textTransform: 'uppercase',
    ...FONTFAMILY.COMFORTAA.md.pt20,
    elevation: 5,
  },
  bubbleWrapper: {
    left: {
      alignSelf: 'flex-start',
      backgroundColor: COLORS.chat.left,
      padding: 3,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.3,
      shadowRadius: 4,
    },
    right: {
      alignSelf: 'flex-end',
      backgroundColor: COLORS.chat.right,
      padding: 3,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.3,
      shadowRadius: 4,
    },
  },
  bubbleContainer: {
    left: {maxWidth: '80%', marginLeft: -45},
    right: {maxWidth: '80%'},
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: screen_height * 0.8,
    width: screen_width,
  },
});

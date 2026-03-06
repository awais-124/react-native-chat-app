import {useState, useEffect, useCallback} from 'react';
import firestore from '@react-native-firebase/firestore';

import algoRSA from '../utils/crypto/RSA';
import AES from '../utils/crypto/AES';

import StorageService from '../services/StorageService';
import MessageCache from '../utils/MessageCache';

/**
 * useChat handles all Firebase subscription and message decryption logic
 * decoupling it entirely from the UI components.
 *
 * @param {string} senderId - Current signed-in user ID
 * @param {string} receiverId - The user ID we are chatting with
 * @param {string} publicKey - The receiver's public key (to encrypt outgoing messages to them)
 */
const useChat = (senderId, receiverId, publicKey) => {
  const [messages, setMessages] = useState([]);
  const [privateKey, setPrivateKey] = useState('');
  const [senderPublicKey, setSenderPublicKey] = useState('');
  const [loading, setLoading] = useState(false);

  const senderIdentifier = `${senderId}_${receiverId}`;
  const receiverIdentifier = `${receiverId}_${senderId}`;

  // Grab the local device's keys
  useEffect(() => {
    const getMyPrivateKey = async () => {
      const temp = await StorageService.getItem('KEYS');
      const keys = JSON.parse(temp);
      setPrivateKey(keys.private);
      setSenderPublicKey(keys.public);
    };

    getMyPrivateKey();
  }, []);

  // Fetch / Decrypt Flow
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const subscriber = firestore()
        .collection('chats')
        .doc(senderIdentifier)
        .collection('messages')
        .orderBy('createdAt', 'desc');

      const unsubscribe = subscriber.onSnapshot(async querySnapshot => {
        const messageMap = new Map(messages.map(msg => [msg._id, msg]));
        const newMessagesPromises = querySnapshot.docs.map(async doc => {
          if (!messageMap.has(doc.id)) {
            const firebaseData = doc.data();
            const encryptedAESKeys = firebaseData.metadata.key;

            try {
              const cachedText = await MessageCache.getCachedMessage(doc.id);
              let clearText = cachedText;

              if (!clearText) {
                const aesKey = await algoRSA.decryptMessage(
                  privateKey,
                  encryptedAESKeys,
                );
                if (!aesKey) throw new Error('AES KEY NOT DECRYPTED');

                clearText = AES.decrypt(firebaseData.text, aesKey);

                // Save to local SQLite cache
                await MessageCache.cacheMessage(
                  doc.id,
                  clearText,
                  senderIdentifier,
                );
              }

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
                text: 'Decryption Error / Uncached',
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
  }, [senderId, receiverId, privateKey, senderIdentifier]);

  // Send / Encrypt Flow
  const onSend = useCallback(
    async (messagesArray = []) => {
      const message = messagesArray[0];
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
        const batch = firestore().batch();
        const docId = myMsg._id;

        const senderRef = firestore()
          .collection('chats')
          .doc(senderIdentifier)
          .collection('messages')
          .doc(docId);

        const receiverRef = firestore()
          .collection('chats')
          .doc(receiverIdentifier)
          .collection('messages')
          .doc(docId);

        batch.set(senderRef, myMsg);
        batch.set(receiverRef, myMsg);

        await batch.commit();

        // Ensure our own local sent message is cached immediately to bypass fetching later
        await MessageCache.cacheMessage(docId, message.text, senderIdentifier);
      } catch (error) {
        console.log('ON SEND ERROR: ', error);
      }
    },
    [senderId, receiverId, publicKey, senderIdentifier, receiverIdentifier],
  );

  return {
    messages,
    loading,
    onSend,
  };
};

export default useChat;

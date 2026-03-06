import React, {useState, useEffect} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';

import firestore from '@react-native-firebase/firestore';

import COLORS from '../../constants/colors';
import CONSTANTS from '../../constants/CONSTANTS';
import HANDLERS from '../../utils/helpers';
import FONTFAMILY from '../../constants/fonts';
import ICONS from '../../constants/icons';

import {screen_width} from '../../utils/Dimensions';
import Header from '../../components/Header';

import {styles} from './styles';

const Encryption = ({navigation, route}) => {
  const ids = route.params.ids;
  const sender = ids.senderId;
  const receiver = ids.receiverId;
  const username = ids?.contactName;

  const sendingId = `${sender}_${receiver}`;
  const receivingId = `${receiver}_${sender}`;

  const [tab, setTab] = useState(1);
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [sentMessages, setSentMessages] = useState([]);

  const goToDecryptMessageScreen = (msg, key, createdAt, username) => {
    console.log({msg, key});
    const msgData = {
      encryptedMessage: msg,
      encryptedAesKey: key,
      date: createdAt,
      user: username,
      sender,
      receiver,
    };
    navigation.navigate('DecryptMessage', {data: msgData});
  };

  const goToUsers = () => navigation.navigate('Users');

  // getting sent messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const subscriber = firestore()
          .collection('encryption')
          .doc(sendingId)
          .collection('messages')
          .orderBy('createdAt', 'desc')
          .onSnapshot(querySnapshot => {
            const fetchedMessages = [];
            querySnapshot.forEach(doc => {
              fetchedMessages.push(doc.data());
            });
            setSentMessages(fetchedMessages);
          });
        return subscriber;
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const subscriber = firestore()
          .collection('encryption')
          .doc(receivingId)
          .collection('messages')
          .orderBy('createdAt', 'desc')
          .onSnapshot(querySnapshot => {
            const fetchedMessages = [];
            querySnapshot.forEach(doc => {
              fetchedMessages.push(doc.data());
            });
            setReceivedMessages(fetchedMessages);
          });
        return subscriber;
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, []);

  const Tab = ({title, onClick, tip}) => (
    <TouchableWithoutFeedback onPress={onClick}>
      <View
        style={[tab === tip ? {...styles.tab, ...styles.border} : styles.tab]}>
        <Text style={styles.tabTitle}>{title}</Text>
      </View>
    </TouchableWithoutFeedback>
  );

  const toggleTab = tip => setTab(tip);
  const navigateToSendMessage = () => {
    const data = {
      receiverId: receiver,
      senderId: sender,
    };
    navigation.navigate('SendMessage', {ids: data});
  };

  const renderInboxMessageItem = ({item}) => (
    <TouchableWithoutFeedback
      onPress={() =>
        goToDecryptMessageScreen(
          item.text,
          item.metadata.key,
          item.createdAt,
          username,
        )
      }>
      <View style={styles.messageItem}>
        <Text style={styles.messageText}>{item.text.substring(0, 30)}...</Text>
        <Text style={styles.messageDate}>
          {HANDLERS.convertTimestampToDate(item.createdAt)}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );

  const renderSentMessageItem = ({item}) => (
    <View style={styles.messageItem}>
      <Text style={styles.messageText}>{item.text.substring(0, 30)}...</Text>
      <Text style={styles.messageDate}>
        {HANDLERS.convertTimestampToDate(item.createdAt)}
      </Text>
    </View>
  );

  const renderEmpty = () => (
    <View style={styles.emptyBox}>
      <Text style={styles.noMessagesText}>{`No messages yet`}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header title={`${username.toUpperCase()}`} onClick={goToUsers} />
      <View style={styles.tabs}>
        <Tab title="INBOX" onClick={() => toggleTab(1)} tip={1} />
        <Tab title="SENT" onClick={() => toggleTab(0)} tip={0} />
      </View>
      {tab === 1 ? (
        <FlatList
          data={receivedMessages}
          renderItem={renderInboxMessageItem}
          keyExtractor={item => item._id}
          ListEmptyComponent={renderEmpty}
        />
      ) : (
        <View style={{flex: 1}}>
          <FlatList
            data={sentMessages}
            renderItem={renderSentMessageItem}
            keyExtractor={item => item._id}
            ListEmptyComponent={renderEmpty}
          />
          <TouchableOpacity style={styles.fab} onPress={navigateToSendMessage}>
            <View style={styles.fabIcon}>
              <Image source={ICONS.PLUS} style={styles.plus} />
            </View>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Encryption;

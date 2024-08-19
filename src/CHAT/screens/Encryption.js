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

import COLORS from '../../AUTH/styles/colors';
import CONSTANTS from '../../AUTH/helpers/CONSTANTS';
import FONTFAMILY from '../../AUTH/styles/fonts';
import ICONS from '../../AUTH/helpers/icons';

import {screen_width} from '../../AUTH/utils/Dimensions';
import CustomHeader from '../components/CustomHeader';

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
      receiver
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
          {CONSTANTS.convertTimestampToDate(item.createdAt)}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );

  const renderSentMessageItem = ({item}) => (
    <View style={styles.messageItem}>
      <Text style={styles.messageText}>{item.text.substring(0, 30)}...</Text>
      <Text style={styles.messageDate}>
        {CONSTANTS.convertTimestampToDate(item.createdAt)}
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
      <CustomHeader title={`${username.toUpperCase()}`} onClick={goToUsers} />
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

const styles = StyleSheet.create({
  container: {flex: 1},

  tabs: {
    width: screen_width,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary.blue,
    // gap: 3,
  },
  tab: {
    width: '50%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary.blue,
    borderColor: COLORS.primary.blue,
    borderWidth: 3,
  },
  border: {
    borderColor: COLORS.secondary.white,
    borderWidth: 3,
  },
  tabTitle: {...FONTFAMILY.MONTSERRAT.reg.pt16, color: COLORS.secondary.white},
  messageItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.secondary.black,
    backgroundColor: COLORS.secondary.greySix,
  },
  messageText: {
    ...FONTFAMILY.MONTSERRAT.reg.pt16,
    color: COLORS.secondary.black,
  },
  messageDate: {
    ...FONTFAMILY.MONTSERRAT.reg.pt12,
    color: COLORS.secondary.greyOne,
    textAlign: 'right',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.primary.blue,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 10,
    borderWidth: 1,
    borderColor: COLORS.secondary.white,
  },
  fabIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  plus: {
    tintColor: COLORS.secondary.white,
  },
  noMessagesText: {
    ...FONTFAMILY.MONTSERRAT.reg.pt16,
    color: COLORS.secondary.black,
    textAlign: 'center',
    marginTop: 20,
  },
  emptyBox: {},
});

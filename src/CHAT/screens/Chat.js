import {StyleSheet, View, StatusBar} from 'react-native';
import React, {useState} from 'react';

import Users from '../tabs/Users';
import Profile from '../tabs/Profile';
import TabButton from '../components/TabButton';

import ICONS from '../../AUTH/helpers/icons';
import COLORS from '../../AUTH/styles/colors';

const Chat = () => {
  const [tab, setTab] = useState(0);
  const setProfile = () => setTab(0);
  const setMessage = () => setTab(1);
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.primary.blue} />
      {tab ? <Users setMessage={setTab} /> : <Profile />}
      <View style={styles.bottomTab}>
        <TabButton
          label="Profile"
          icon={ICONS.PROFILE_TAB}
          onClick={setProfile}
          state={tab}
        />
        <TabButton
          label="Message"
          icon={ICONS.MESSAGE_TAB}
          onClick={setMessage}
          state={!tab}
        />
      </View>
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.secondary.white,
  },
  bottomTab: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 70,
    backgroundColor: COLORS.primary.blue,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 60,
  },
  tab: {
    width: '50%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabIcon: {height: 40, aspectRatio: 1},
});

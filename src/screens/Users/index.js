import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import useUsers from '../../hooks/useUsers';

import Header from '../../components/Header';
import Screen from '../../components/Screen';
import {theme} from '../../styles/theme';

import FONTFAMILY from '../../constants/fonts';
import COLORS from '../../constants/colors';
import ICONS from '../../constants/icons';

import {screen_height, screen_width} from '../../utils/Dimensions';

import {styles} from './styles';

const Users = ({setMessage}) => {
  const {users, loading: visible, currentId: id} = useUsers();
  const navigation = useNavigation();

  const goToMessage = item => {
    const userData = {
      email: item.email,
      name: item.name,
      phone: item.phone,
      password: item.password,
      userId: item.userId,
      privateKey: item.privateKey,
      publicKey: item.publicKey,
    };
    navigation.navigate('Message', {receiver: userData, id});
  };

  const Contacts = ({item, index}) => (
    <TouchableOpacity onPress={() => goToMessage(item)}>
      <View style={styles.item} key={index}>
        <Image source={ICONS.AVATARBLUE} style={styles.avatar} />
        <Text style={styles.name}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  const goToProfile = () => setMessage(0);

  return (
    <Screen safeAreaEdges={['top', 'bottom']} style={styles.container}>
      <Header onBackPress={goToProfile} title="CONTACTS" />
      {visible ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      ) : (
        <FlatList
          data={users}
          renderItem={Contacts}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </Screen>
  );
};

export default Users;

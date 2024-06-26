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
import firestore from '@react-native-firebase/firestore';
import StorageService from '../../AUTH/utils/StorageHelper';

import ScreenWrapper from '../../AUTH/components/ScreenWrapper';
import FONTFAMILY from '../../AUTH/styles/fonts';
import COLORS from '../../AUTH/styles/colors';
import ICONS from '../../AUTH/helpers/icons';

import {screen_height, screen_width} from '../../AUTH/utils/Dimensions';
import CustomHeader from '../components/CustomHeader';
import StyledInput from '../components/StyledInput';

let id = '';

const Users = ({setMessage}) => {
  const [users, setUsers] = useState([]);
  const [visible, setVisible] = useState(false);
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

  useEffect(() => {
    setVisible(true);
    const getUsers = async () => {
      try {
        id = await StorageService.getItem('USERID');
        const myEmail = await StorageService.getItem('EMAIL');
        const querySnapshot = await firestore()
          .collection('users')
          .where('email', '!=', myEmail)
          .get();
        let allUsers = querySnapshot.docs;
        const parsedResult = allUsers.map(docSnapshot => docSnapshot._data);
        if (querySnapshot.docs.length !== 0) setUsers(parsedResult);
        setVisible(false);
      } catch (error) {
        console.log('GET USERS: ', error);
        setVisible(false);
        Alert.alert('Error', 'Failed to fetch list of users!');
      }
    };
    getUsers();
  }, []);

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
    <ScreenWrapper>
      <View style={styles.container}>
        <CustomHeader onClick={goToProfile} title="CONTACTS" />
        {visible ? (
          <View style={styles.loader}>
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <FlatList data={users} renderItem={Contacts} />
        )}
      </View>
    </ScreenWrapper>
  );
};

export default Users;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.secondary.white,
    alignItems: 'center',
  },
  loader: {
    height: screen_height * 0.65,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    width: screen_width,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.secondary.greyThree,
    marginBottom: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    gap: 20,
  },
  name: {
    ...FONTFAMILY.MONTSERRAT.md.pt18,
    textTransform: 'capitalize',
    color: COLORS.secondary.black,
  },
  avatar: {
    height: 45,
    width: 45,
    aspectRatio: 1,
  },
});

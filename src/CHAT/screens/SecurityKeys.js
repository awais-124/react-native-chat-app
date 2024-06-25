import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ImageBackground,
  StatusBar,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import ASSETS from '../../AUTH/helpers/imports';
import COLORS from '../../AUTH/styles/colors';
import FONTFAMILY from '../../AUTH/styles/fonts';

import StorageService from '../../AUTH/utils/StorageHelper';

import {screen_width, screen_height} from '../../AUTH/utils/Dimensions';
import ICONS from '../../AUTH/helpers/icons';

const SecurityKeys = ({navigation}) => {
  const [PBK, setPBK] = useState('');
  const [PRK, setPRK] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const Keys = await StorageService.getItem('KEYS');
      const obj = obj !== null ? JSON.parse(Keys) : null;
      console.log('Keys: ', obj);
      const privateKey = obj?.private;
      const publicKey = obj?.public;
      console.log('Keys: ', privateKey, publicKey);
      setPRK(privateKey);
      setPBK(publicKey);
    };

    fetchData();
  }, []);

  const goToProfile = () => navigation.goBack();

  return (
    <ImageBackground source={ASSETS.WALLPAPER} style={styles.container}>
      <StatusBar backgroundColor="#000" barStyle="light-content" />
      <View style={styles.main}>
        <View style={styles.header}>
          <TouchableOpacity onPress={goToProfile}>
            <Image source={ICONS.ARROW_LEFT} style={styles.arrow} />
          </TouchableOpacity>
          <Text style={styles.mainHeading}>{'⚠  confidential  ⚠'}</Text>
        </View>
        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={styles.scroll}>
          <Text style={styles.headings}>Private Key:</Text>
          <View style={styles.box}>
            <Text style={styles.keys}>{PRK}</Text>
          </View>
          <Text style={styles.headings}>Public Key:</Text>
          <View style={styles.box}>
            <Text style={styles.keys}>{PBK}</Text>
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

export default SecurityKeys;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.secondary.black,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    width: screen_width * 0.71,
    // backgroundColor: '#aaa',
    alignSelf: 'flex-start',
  },
  arrow: {marginLeft: -5},
  main: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainHeading: {
    color: COLORS.secondary.white,
    ...FONTFAMILY.MONTSERRAT.b.pt20,
    marginBottom: 20,
    textTransform: 'uppercase',
  },
  scrollContainer: {
    width: '100%',
  },
  scroll: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  headings: {
    ...FONTFAMILY.MONTSERRAT.sb.pt16,
    alignSelf: 'flex-start',
    color: COLORS.secondary.white,
    marginLeft: screen_width * 0.075,
    marginBottom: 10,
  },
  box: {
    borderWidth: 2,
    borderColor: COLORS.secondary.white,
    borderRadius: 5,
    padding: 20,
    width: screen_width * 0.85,
    minHeight: 50, // Set a minimum height to avoid collapsing
    marginBottom: 30,
  },
  keys: {
    color: COLORS.secondary.white,
    ...FONTFAMILY.MONTSERRAT.reg.pt12,
    textAlign: 'left',
    lineHeight: 20,
  },
});

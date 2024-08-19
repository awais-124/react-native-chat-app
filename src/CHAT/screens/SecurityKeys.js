import {StyleSheet, Text, View, ScrollView, Image} from 'react-native';
import React, {useEffect, useState} from 'react';

import COLORS from '../../AUTH/styles/colors';
import FONTFAMILY from '../../AUTH/styles/fonts';

import StorageService from '../../AUTH/utils/StorageHelper';
import {screen_width} from '../../AUTH/utils/Dimensions';

import ICONS from '../../AUTH/helpers/icons';

import CustomHeader from '../components/CustomHeader';

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

  const InfoBox = ({title, _key}) => {
    return (
      <View style={styles.keyContainerStyle}>
        <View style={styles.keyBox}>
          <IconBox icon={ICONS.KEY} />
          <Text style={styles.keylabel}>{title}</Text>
          <IconBox icon={ICONS.KEY} />
        </View>
        <Text style={styles.keyvalue}>{_key}</Text>
      </View>
    );
  };

  const IconBox = ({icon}) => (
    <View style={styles.icon}>
      <Image source={icon} style={styles.iconImage} />
    </View>
  );

  return (
    <View style={styles.container}>
      <CustomHeader title="SECURITY KEYS" onClick={goToProfile} />
      <View style={styles.main}>
        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}>
          <InfoBox title={'Public Key'} _key={PBK} />
          <InfoBox title={'Private Key'} _key={PRK} />
        </ScrollView>
      </View>
    </View>
  );
};

export default SecurityKeys;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.secondary.white,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
    paddingHorizontal: 20,
  },
  main: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
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
  keyContainerStyle: {
    backgroundColor: COLORS.primary.blue,
    padding: 15,
    marginBottom: 20,
    borderRadius: 15,
    elevation: 5,
    gap: 15,
  },
  keyBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  keylabel: {
    ...FONTFAMILY.MONTSERRAT.b.pt18,
    color: COLORS.secondary.white,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  keyvalue: {
    ...FONTFAMILY.POPPINS.reg.pt16,
    color: COLORS.secondary.white,
    textAlign: 'center',
  },
  icon: {
    backgroundColor: COLORS.secondary.white,
    padding: 5,
    borderRadius: 50,
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconImage: {width: 32, height: 32},
});

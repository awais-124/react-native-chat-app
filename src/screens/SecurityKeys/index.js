import {StyleSheet, Text, View, ScrollView, Image} from 'react-native';
import React, {useEffect, useState} from 'react';

import COLORS from '../../constants/colors';
import FONTFAMILY from '../../constants/fonts';

import StorageService from '../../services/StorageService';
import {screen_width} from '../../utils/Dimensions';

import ICONS from '../../constants/icons';

import Header from '../../components/Header';
import Screen from '../../components/Screen';
import Card from '../../components/Card';
import {theme} from '../../styles/theme';

import {styles} from './styles';

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

  const InfoCard = ({title, _key}) => (
    <Card
      elevation="medium"
      contentStyle={styles.cardContent}
      rightAction={
        <Image
          source={ICONS.KEY}
          style={styles.cardIcon}
          resizeMode="contain"
        />
      }>
      <Text style={styles.label}>{title}</Text>
      <Text style={styles.value} selectable>
        {_key}
      </Text>
    </Card>
  );

  return (
    <Screen safeAreaEdges={['top', 'bottom']} style={styles.container}>
      <Header title="SECURITY KEYS" onBackPress={goToProfile} />
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}>
        <InfoCard title={'Public Key'} _key={PBK} />
        <InfoCard title={'Private Key'} _key={PRK} />
      </ScrollView>
    </Screen>
  );
};

export default SecurityKeys;

import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
} from 'react-native';
import React from 'react';
import Header from '../../components/Header';
import Screen from '../../components/Screen';
import Card from '../../components/Card';
import {theme} from '../../styles/theme';

import COLORS from '../../constants/colors';
import ICONS from '../../constants/icons';

import {styles} from './styles';

const ContactUs = ({navigation}) => {
  const Box = ({label, value, iconSrc}) => (
    <Card
      elevation="small"
      contentStyle={styles.cardContent}
      rightAction={
        iconSrc ? (
          <Image
            source={iconSrc}
            style={styles.cardIcon}
            resizeMode="contain"
          />
        ) : null
      }>
      <View style={styles.textBox}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value} selectable>
          {value}
        </Text>
      </View>
    </Card>
  );

  return (
    <Screen safeAreaEdges={['top', 'bottom']} style={styles.container}>
      <Header title="Contact Us" onBackPress={() => navigation.goBack()} />
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.details}>
          <Text style={styles.heading}>Contact</Text>
          <Text style={styles.message}>
            We are always ready to help you 24/7. Feel free to contact us with
            following contact details:
          </Text>
        </View>
        <Box
          label="Email"
          value="awais14940@gmail.com"
          iconSrc={ICONS.AT_THE_RATE}
        />
        <Box label="Whatsapp" value="+923269872844" iconSrc={ICONS.WHATSAPP} />
        <Box
          label="Email"
          value="im.mtayyab@gmail.com"
          iconSrc={ICONS.AT_THE_RATE}
        />
        <Box label="Whatsapp" value="+923165087120" iconSrc={ICONS.WHATSAPP} />
        <Box
          label="Email"
          value="hashiribrar0@gmail.com"
          iconSrc={ICONS.AT_THE_RATE}
        />
        <Box label="Whatsapp" value="+923325745453" iconSrc={ICONS.WHATSAPP} />
      </ScrollView>
    </Screen>
  );
};

export default ContactUs;

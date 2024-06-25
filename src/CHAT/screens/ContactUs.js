import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
} from 'react-native';
import React from 'react';
import CustomHeader from '../components/CustomHeader';
import COLORS from '../../AUTH/styles/colors';
import ICONS from '../../AUTH/helpers/icons';
import {screen_width} from '../../AUTH/utils/Dimensions';
import FONTFAMILY from '../../AUTH/styles/fonts';

const ContactUs = ({navigation}) => {
  const Box = ({label, value, iconSrc}) => (
    <View style={styles.box}>
      <Image source={iconSrc} />
      <View style={styles.textBox}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.primary.blue} />
      <CustomHeader title="Contact Us" onClick={() => navigation.goBack()} />
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
    </View>
  );
};

export default ContactUs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.secondary.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollViewContent: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  box: {
    width: screen_width * 0.9,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderWidth: 1,
    borderColor: COLORS.secondary.greyThree,
    borderRadius: 20,
    marginVertical: 10,
  },
  textBox: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  details: {
    paddingHorizontal: 10,
    gap: 10,
    width: screen_width * 0.9,
    alignItems: 'flex-start',
  },
  message: {
    ...FONTFAMILY.MONTSERRAT.reg.pt16,
    color: COLORS.secondary.black,
    textAlign: 'left',
  },
  heading: {
    ...FONTFAMILY.MONTSERRAT.b.pt20,
    color: COLORS.secondary.black,
    textAlign: 'center',
  },
  label: {
    ...FONTFAMILY.MONTSERRAT.b.pt14,
    color: COLORS.secondary.black,
  },
  value: {
    ...FONTFAMILY.MONTSERRAT.reg.pt16,
    color: COLORS.secondary.black,
  },
});

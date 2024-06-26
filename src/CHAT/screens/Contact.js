import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Image} from 'react-native';

import firestore from '@react-native-firebase/firestore';

import Loader from '../../AUTH/components/Loader';
import CustomHeader from '../components/CustomHeader';

import COLORS from '../../AUTH/styles/colors';
import FONTFAMILY from '../../AUTH/styles/fonts';
import CONSTANTS from '../../AUTH/helpers/CONSTANTS';
import ICONS from '../../AUTH/helpers/icons';

const Contact = ({navigation, route}) => {
  const {id: contactId} = route.params;
  const [contactName, setContactName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [publicKey, setPublicKey] = useState('');
  const [visible, setVisible] = useState(false);

  const goBack = () => navigation.goBack();
  useEffect(() => {
    fetchContactDetails();
  }, []);

  const fetchContactDetails = async () => {
    try {
      setVisible(true);
      const contactDocument = await firestore()
        .collection('users')
        .doc(contactId)
        .get();
      if (contactDocument.exists) {
        const data = contactDocument.data();
        setContactName(data.name);
        setEmail(data.email);
        setPhoneNumber(data.phone);
        setDob(CONSTANTS.convertTimestampToDate(data.date));
        setPublicKey(data.publicKey);
        console.log({data});
      } else {
        console.log('Contact not found');
      }
      setVisible(false);
    } catch (error) {
      console.error('Error fetching contact details: ', error);
      setVisible(false);
    }
  };

  const InfoBox = ({title, value, src, isKey = false}) => {
    return (
      <>
        {!isKey && (
          <View style={styles.infoContainer}>
            <IconBox icon={src} />
            <View style={styles.databox}>
              <Text style={styles.label}>{title}</Text>
              <Text style={styles.value}>{value}</Text>
            </View>
          </View>
        )}
        {isKey && (
          <View style={styles.keyContainerStyle}>
            <View style={styles.keyBox}>
              <IconBox icon={ICONS.KEY} />
              <Text style={styles.keylabel}>Public Key</Text>
              <IconBox icon={ICONS.KEY} />
            </View>
            <Text style={styles.keyvalue}>{publicKey}</Text>
          </View>
        )}
      </>
    );
  };

  const IconBox = ({icon}) => (
    <View style={styles.icon}>
      <Image source={icon} style={styles.iconImage} />
    </View>
  );

  return (
    <View style={styles.container}>
      {visible && <Loader />}
      {!visible && (
        <>
          <CustomHeader
            title={'CONTACT DETAILS'}
            onClick={goBack}
            fontSize={FONTFAMILY.MONTSERRAT.sb.pt20}
          />
          <ScrollView contentContainerStyle={styles.contentContainer}>
            <InfoBox
              title="Name"
              value={contactName}
              src={ICONS.NAME}
            />
            <InfoBox
              title="Phone Number"
              value={phoneNumber}
              src={ICONS.CALL}
            />
            <InfoBox title="Email" value={email} src={ICONS.EMAIL_BLACK} />
            <InfoBox title="Date of birth" value={dob} src={ICONS.CAKE} />
            <InfoBox
              title="Public Key"
              value={publicKey}
              src={ICONS.KEY}
              isKey={true}
            />
          </ScrollView>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.secondary.white,
  },
  header: {
    height: 60,
    backgroundColor: COLORS.primary.blue,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    marginBottom: 20,
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
  headerText: {
    ...FONTFAMILY.MONTSERRAT.sb.pt20,
    textTransform: 'uppercase',
    color: COLORS.secondary.white,
  },
  contentContainer: {
    padding: 15,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary.blue,
    padding: 15,
    marginBottom: 20,
    borderRadius: 15,
    elevation: 5,
    gap: 10,
  },
  databox: {gap: 5, flex: 1},
  keyContainerStyle: {
    backgroundColor: COLORS.primary.blue,
    padding: 15,
    marginBottom: 20,
    borderRadius: 15,
    elevation: 5,
    gap: 10,
  },
  keyBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    ...FONTFAMILY.COMFORTAA.b.pt16,
    color: '#ddd',
  },
  keylabel: {
    ...FONTFAMILY.MONTSERRAT.b.pt18,
    color: COLORS.secondary.white,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  value: {
    ...FONTFAMILY.POPPINS.reg.pt16,
    color: COLORS.secondary.white,
  },
  keyvalue: {
    ...FONTFAMILY.POPPINS.reg.pt16,
    color: COLORS.secondary.white,
    textAlign: 'center',
  },
});

export default Contact;

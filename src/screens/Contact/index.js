import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Image} from 'react-native';

import useContact from '../../hooks/useContact';

import Header from '../../components/Header';
import Card from '../../components/Card';
import Screen from '../../components/Screen';

import COLORS from '../../constants/colors';
import ICONS from '../../constants/icons';

import {styles} from './styles';

const Contact = ({navigation, route}) => {
  const {id: contactId} = route.params;
  const {contactData, loading: visible} = useContact(contactId);

  const goBack = () => navigation.goBack();

  const InfoCard = ({title, value, icon, isKey = false}) => (
    <Card
      elevation="medium"
      contentStyle={styles.cardContent}
      rightAction={
        icon ? (
          <Image source={icon} style={styles.cardIcon} resizeMode="contain" />
        ) : null
      }>
      <Text style={styles.label}>{title}</Text>
      <Text style={styles.value} selectable={isKey}>
        {value}
      </Text>
    </Card>
  );

  return (
    <Screen safeAreaEdges={['top', 'bottom']} style={styles.container}>
      <Header title="CONTACT DETAILS" onBackPress={goBack} />

      {!visible && (
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <InfoCard title="Name" value={contactData.name} icon={ICONS.NAME} />
          <InfoCard
            title="Phone Number"
            value={contactData.phone}
            icon={ICONS.CALL}
          />
          <InfoCard
            title="Email"
            value={contactData.email}
            icon={ICONS.EMAIL_BLACK}
          />
          <InfoCard
            title="Date of birth"
            value={contactData.dob}
            icon={ICONS.CAKE}
          />
          <InfoCard
            title="Public Key"
            value={contactData.publicKey}
            icon={ICONS.KEY}
            isKey={true}
          />
        </ScrollView>
      )}
    </Screen>
  );
};

export default Contact;

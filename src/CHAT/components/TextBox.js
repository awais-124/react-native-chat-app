import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';

import COLORS from '../../AUTH/styles/colors';
import FONTFAMILY from '../../AUTH/styles/fonts';
import ICONS from '../../AUTH/helpers/icons';

const TextBox = ({text, heading, icon = ICONS.ENCRYPTION_KEY}) => {
  return (
    <View style={styles.messageBox}>
      <View style={styles.headingBox}>
        <Text style={styles.heading}>{heading}</Text>
        <Image source={icon} style={styles.vector} />
      </View>

      <Text style={styles.messageText}>{text}</Text>
    </View>
  );
};

export default TextBox;

const styles = StyleSheet.create({
  messageBox: {
    backgroundColor: COLORS.secondary.greySix,
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.secondary.greyFour,
    gap:15
  },
  heading: {
    ...FONTFAMILY.MONTSERRAT.sb.pt18,
    color: COLORS.secondary.greyDark,
    textTransform: 'capitalize',
    marginBottom: 20,
  },
  messageText: {
    ...FONTFAMILY.MONTSERRAT.reg.pt16,
    color: COLORS.secondary.black,
  },
  headingBox:{ flexDirection:"row", justifyContent:"space-between" , alignItems:"flex-start"},
  vector: { width: 40, height: 40 , tintColor : COLORS.primary.orange }
});

import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import COLORS from '../../AUTH/styles/colors';
import {screen_width} from '../../AUTH/utils/Dimensions';
import FONTFAMILY from '../../AUTH/styles/fonts';

const Cards = ({onClick, label, icon}) => {
  return (
    <TouchableOpacity onPress={onClick}>
      <View style={styles.box}>
        <Image source={icon} style={styles.vector} />
        <Text style={styles.label}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Cards;

const styles = StyleSheet.create({
  box: {
    elevation: 1,
    backgroundColor: COLORS.secondary.white,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: screen_width * 0.85,
    height: 60,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: COLORS.secondary.greyFour,
    paddingHorizontal: 20,
    gap: 15,
  },
  label: {
    color: COLORS.secondary.black,
    ...FONTFAMILY.COMFORTAA.sb.pt16,
    textTransform: 'capitalize',
  },vector:{ width:25,height:25,tintColor:COLORS.primary.orange}
});

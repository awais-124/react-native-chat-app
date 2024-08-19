import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import COLORS from '../../AUTH/styles/colors';
import FONTFAMILY from '../../AUTH/styles/fonts';

const TabButton = ({label, icon, onClick, state}) => {
  return (
    <TouchableOpacity onPress={onClick}>
      <View style={styles.box}>
        <View style={[!state ? styles.circle : styles.black]}>
          <Image
            source={icon}
            style={[styles.define, state ? styles.white : styles.black]}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default TabButton;

const styles = StyleSheet.create({
  box: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    gap: 5,
  },
  define: {width: 40, height: 40},
  white: {
    tintColor: COLORS.secondary.white,
  },
  black: {
    tintColor: COLORS.secondary.black,
  },
  title: {
    color: COLORS.secondary.white,
    ...FONTFAMILY.MONTSERRAT.reg.pt12,
    textTransform: 'uppercase',
  },
  circle: {
    backgroundColor: COLORS.secondary.white,
    padding: 8,
    borderRadius: 50,
    borderWidth: 0.5,
    borderColor: COLORS.primary.blue,
  },
});

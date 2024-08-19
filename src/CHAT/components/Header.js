import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

import FONTFAMILY from '../../AUTH/styles/fonts';
import ICONS from '../../AUTH/helpers/icons';
import {screen_width} from '../../AUTH/utils/Dimensions';
import COLORS from '../../AUTH/styles/colors';

const Header = ({name = 'CONTACT NAME', goBack, goToContact}) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={goBack}>
        <Image source={ICONS.ARROW_LEFT} style={styles.icon} />
      </TouchableOpacity>
      <Text style={styles.title}>{name}</Text>
      <TouchableOpacity onPress={goToContact}>
        <Image source={ICONS.PROFILE} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    elevation: 5,
    width: screen_width,
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: COLORS.primary.blue,
  },
  title: {
    color: COLORS.secondary.white,
    fontSize: 18,
    fontWeight: '300',
    textTransform: 'uppercase',
    ...FONTFAMILY.COMFORTAA.md.pt20,
    elevation: 5,
  },
  icon: {
    tintColor: COLORS.secondary.white,
  },
});

import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';
import ICONS from '../../AUTH/helpers/icons';
import COLORS from '../../AUTH/styles/colors';
import {screen_width} from '../../AUTH/utils/Dimensions';
import FONTFAMILY from '../../AUTH/styles/fonts';

const Logout = ({onClick}) => {
  return (
    <TouchableWithoutFeedback onPress={onClick}>
      <View style={styles.box}>
        <Image source={ICONS.LOGOUT} />
        <Text style={styles.label}>Log out</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Logout;

const styles = StyleSheet.create({
  box: {
    backgroundColor: COLORS.secondary.red,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: screen_width * 0.85,
    height: 60,
    borderRadius: 10,
    paddingHorizontal: 20,
    gap: 15,
  },
  label: {
    color: COLORS.secondary.white,
    ...FONTFAMILY.COMFORTAA.sb.pt16,
    textTransform: 'capitalize',
  },
});

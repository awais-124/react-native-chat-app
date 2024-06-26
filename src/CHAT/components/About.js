import {StyleSheet, Text, View, Image} from 'react-native';

import {screen_height, screen_width} from '../../AUTH/utils/Dimensions';

import COLORS from '../../AUTH/styles/colors';
import FONTFAMILY from '../../AUTH/styles/fonts';
import ICONS from '../../AUTH/helpers/icons';

const About = ({data}) => {
  return (
    <View style={styles.card}>
      <View style={[styles.col, styles.colone]}>
        <Image source={ICONS.PROFILE_TAB} style={styles.icon} />
        <Image source={ICONS.EMAIL_BLACK} style={styles.icons} />
        <Image source={ICONS.CAKE} style={styles.icons} />
      </View>
      <View style={[styles.col, styles.coltwo]}>
        <Text style={styles.name}>{data.name}</Text>
        <Text style={styles.email}>{`${data.email}`}</Text>
        <Text style={styles.dob}>{`${data.dob}`}</Text>
      </View>
    </View>
  );
};

export default About;

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    padding: 15,
    width: screen_width * 0.85,
    elevation: 10,
    gap: 15,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: COLORS.secondary.white,
    flexDirection: 'row',
  },
  name: {
    ...FONTFAMILY.MONTSERRAT.reg.pt16,
    color: COLORS.secondary.black,
    flexShrink: 1,
    textTransform: 'capitalize',
  },
  email: {
    ...FONTFAMILY.MONTSERRAT.reg.pt16,
    color: COLORS.secondary.black,
    flexShrink: 1,
  },
  dob: {
    ...FONTFAMILY.MONTSERRAT.reg.pt16,
    color: COLORS.secondary.black,
    flexShrink: 1,
  },
  icons: {width: 25, height: 25},
  icon: {aspectRatio: 1, height: 30},
  col: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  colone: {gap: 14},
  coltwo: {gap: 18, flex: 1}, // Added flex: 1 to allow proper wrapping
});

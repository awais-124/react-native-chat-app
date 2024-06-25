import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';

import ICONS from '../../AUTH/helpers/icons';
import FONTFAMILY from '../../AUTH/styles/fonts';
import COLORS from '../../AUTH/styles/colors';

import {screen_width} from '../../AUTH/utils/Dimensions';

const CustomHeader = ({
  onClick,
  title,
  fontSize = {...FONTFAMILY.MONTSERRAT.reg.pt20},
}) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.arrow} onPress={onClick}>
        <Image source={ICONS.ARROW_LEFT} />
      </TouchableOpacity>
      <Text style={[fontSize, styles.title]}>{title}</Text>
      <TouchableOpacity style={styles.arrow}>
        <Image source={ICONS.ARROW_LEFT} style={styles.hide} />
      </TouchableOpacity>
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  header: {
    width: screen_width,
    height: 60,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.primary.blue,
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  hide: {opacity: 0},
  title: {
    color: COLORS.secondary.white,
    // ...FONTFAMILY.MONTSERRAT.reg.pt20,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
});

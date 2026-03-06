import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {screen_width} from '../utils/Dimensions';
const {COMFORTAA: com, MONTSERRAT: mon, POPPINS: pop} = FONTFAMILY;

import FONTFAMILY from '../styles/fonts';

import FONTS from '../styles/typography';
import FLEX from '../styles/flex';

const BtnSmall = ({back, color, onClick, text}) => {
  return (
    <TouchableOpacity onPress={onClick}>
      <View style={[FLEX.centered, {backgroundColor: back, ...styles.body}]}>
        <Text style={{color: color, ...styles.text}}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default BtnSmall;

const styles = StyleSheet.create({
  body: {
    width: screen_width * 0.5,
    height: 40,
    borderRadius: 15,
  },
  text: {textAlign: 'center', textTransform: 'uppercase', ...com.b.pt14},
});

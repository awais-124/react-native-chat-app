import {useRef} from 'react';

import {
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import FONTS from '../styles/typography';
import COLORS from '../styles/colors';
import FLEX from '../styles/flex';
import FONTFAMILY from '../styles/fonts';

import {screen_width} from '../utils/Dimensions';
const {COMFORTAA: com, MONTSERRAT: mon, POPPINS: pop} = FONTFAMILY;

const SimpleInput = ({placeHolder = '', data, phColor, onChange}) => {
  const inputRef = useRef(null);

  const handlePress = () => inputRef.current.focus();

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={[FLEX.row, FLEX.justifyCentered, styles.container]}>
        <TextInput
          style={[FONTS.semibold.pt14, styles.input]}
          placeholder={placeHolder}
          placeholderTextColor={phColor}
          value={data}
          ref={inputRef}
          onChangeText={onChange}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SimpleInput;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: COLORS.secondary.greyTwo,
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 60,
    width: screen_width * 0.872,
  },
  input: {height: '80%', width: '100%', ...com.reg.pt14},
});

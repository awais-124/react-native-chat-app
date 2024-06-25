import {StyleSheet, View, TouchableWithoutFeedback, Image} from 'react-native';

import ASSETS from '../helpers/imports';
import COLORS from '../styles/colors';
import {screen_height, screen_width} from '../utils/Dimensions';
const Header = ({goBack}) => {
  return (
    <View style={styles.header}>
      <TouchableWithoutFeedback onPress={goBack}>
        <Image source={ASSETS.TopBar} style={styles.topBar} />
      </TouchableWithoutFeedback>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    backgroundColor: COLORS.primary.blue,
    width: screen_width,
    marginTop: 0,
    position: 'absolute',
    top: 0,
  },
  topBar: {width: '100%'},
});

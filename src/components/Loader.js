import {
  ActivityIndicator,
  Dimensions,
  Modal,
  StyleSheet,
  View,
} from 'react-native';
import {screen_height, screen_width} from '../utils/Dimensions';
import COLORS from '../styles/colors';

const Loader = ({shown, color = COLORS.primary.blue}) => {
  return (
    <Modal transparent visible={shown}>
      <View style={[styles.modalView]}>
        <View style={[styles.mainView, , {backgroundColor: color}]}>
          <ActivityIndicator size="large" color={COLORS.secondary.white} />
        </View>
      </View>
    </Modal>
  );
};

export default Loader;

const styles = StyleSheet.create({
  modalView: {
    width: screen_width,
    height: screen_height,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainView: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.primary.blue,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

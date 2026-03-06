import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import Button, {BUTTON_VARIANTS} from '../../components/Button';
import ICONS from '../../constants/icons';

const Logout = ({onClick}) => {
  return (
    <Button
      text="Log out"
      onPress={onClick}
      variant={BUTTON_VARIANTS.SECONDARY}
      leftIcon={<Image source={ICONS.LOGOUT} style={styles.icon} />}
      style={styles.btn}
    />
  );
};

export default Logout;

const styles = StyleSheet.create({
  btn: {
    marginTop: 20,
    backgroundColor: '#FF3B30', // Destructive action color
    borderColor: '#FF3B30',
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: '#FFF',
  },
});

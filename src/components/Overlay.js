import {StyleSheet, TouchableWithoutFeedback, View} from 'react-native';

const Overlay = ({onClick}) => {
  return (
    <TouchableWithoutFeedback onPress={onClick}>
      <View
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          ...StyleSheet.absoluteFillObject,
        }}
      />
    </TouchableWithoutFeedback>
  );
};

export default Overlay;

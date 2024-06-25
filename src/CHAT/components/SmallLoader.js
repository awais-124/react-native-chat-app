import {StyleSheet, ActivityIndicator, View} from 'react-native';
import React from 'react';
import {screen_height, screen_width} from '../../AUTH/utils/Dimensions';
import COLORS from '../../AUTH/styles/colors';

const SmallLoader = () => {
  return (
    <View style={styles.box}>
      <ActivityIndicator
        size="large"
        color={COLORS.secondary.black}
        style={styles.loader}
      />
    </View>
  );
};

export default SmallLoader;

const styles = StyleSheet.create({
  box: {
    width: '100%',
    height: screen_height * 0.4,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

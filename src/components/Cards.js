import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import COLORS from '../../constants/colors';

import {screen_width} from '../../utils/Dimensions';

import Card from '../../components/Card';
import {theme} from '../../styles/theme';

const Cards = ({onClick, label, icon}) => {
  return (
    <Card
      onPress={onClick}
      elevation="small"
      contentStyle={styles.cardContent}
      rightAction={
        <Image source={icon} style={styles.vector} resizeMode="contain" />
      }>
      <Text style={styles.label}>{label}</Text>
    </Card>
  );
};

export default Cards;

const styles = StyleSheet.create({
  cardContent: {
    paddingVertical: 18,
    paddingHorizontal: 16,
  },
  label: {
    ...theme.typography.title,
    color: theme.colors.text,
    textTransform: 'capitalize',
  },
  vector: {width: 24, height: 24, tintColor: theme.colors.primary},
});

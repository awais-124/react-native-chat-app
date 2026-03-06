import {Dimensions, Platform} from 'react-native';

const {height: screen_height, width: screen_width} = Dimensions.get('window');

const isIos = Platform.OS === 'ios';

export {screen_width, screen_height, isIos};

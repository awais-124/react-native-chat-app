import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Animated,
  useWindowDimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import useAuth from '../../hooks/useAuth';
import Screen, {BACKGROUND_VARIANTS} from '../../components/Screen';
import Button, {BUTTON_VARIANTS} from '../../components/Button';
import COLORS from '../../constants/colors';
import FONTS from '../../constants/typography';
import FLEX from '../../constants/flex';

const SLIDES = [
  {
    id: '1',
    title: 'Secure Messaging',
    description:
      'Your privacy is our priority. End-to-end encryption for every message.',
    image: require('../../../assets/onboarding_slide_1.png'),
  },
  {
    id: '2',
    title: 'Stay Connected',
    description:
      'Real-time communication with your friends and family across the globe.',
    image: require('../../../assets/onboarding_slide_2.png'),
  },
  {
    id: '3',
    title: 'Sync Anywhere',
    description:
      'Access your chats from any device, anytime. Seamless synchronization.',
    image: require('../../../assets/onboarding_slide_3.png'),
  },
];

const Welcome = () => {
  const {width} = useWindowDimensions();
  const navigation = useNavigation();
  const {signInWithGoogle, loading} = useAuth();
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);

  const viewableItemsChanged = useRef(({viewableItems}) => {
    if (viewableItems && viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;

  const handleGoogleSignIn = async () => {
    await signInWithGoogle();
  };

  const handleEmailSignIn = () => {
    navigation.navigate('SignIn');
  };

  const renderItem = ({item}) => (
    <View style={[styles.slide, {width}]}>
      <Image source={item.image} style={styles.image} resizeMode="contain" />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );

  return (
    <Screen variant={BACKGROUND_VARIANTS.IMAGE_SIGNIN}>
      <View style={styles.container}>
        <View style={{flex: 3}}>
          <FlatList
            data={SLIDES}
            renderItem={renderItem}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            bounces={false}
            keyExtractor={item => item.id}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {x: scrollX}}}],
              {
                useNativeDriver: false,
              },
            )}
            scrollEventThrottle={32}
            onViewableItemsChanged={viewableItemsChanged}
            viewabilityConfig={viewConfig}
            ref={slidesRef}
          />
        </View>

        <View style={styles.indicatorContainer}>
          {SLIDES.map((_, i) => {
            const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
            const dotWidth = scrollX.interpolate({
              inputRange,
              outputRange: [10, 20, 10],
              extrapolate: 'clamp',
            });
            const opacity = scrollX.interpolate({
              inputRange,
              outputRange: [0.3, 1, 0.3],
              extrapolate: 'clamp',
            });
            return (
              <Animated.View
                style={[styles.dot, {width: dotWidth, opacity}]}
                key={i.toString()}
              />
            );
          })}
        </View>

        <View style={styles.footer}>
          <Button
            text="Continue with Google"
            onPress={handleGoogleSignIn}
            style={styles.googleBtn}
            textStyle={styles.googleBtnText}
            variant={BUTTON_VARIANTS.SECONDARY}
          />
          <TouchableOpacity onPress={handleEmailSignIn} style={styles.emailBtn}>
            <Text style={styles.emailBtnText}>Sign in with Email</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  image: {
    flex: 0.7,
    width: '100%',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 0.3,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    ...FONTS.bold.pt24,
    color: COLORS.primary.blue,
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    ...FONTS.regular.pt16,
    color: COLORS.grey.dark,
    textAlign: 'center',
    lineHeight: 24,
  },
  indicatorContainer: {
    flexDirection: 'row',
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primary.blue,
    marginHorizontal: 8,
  },
  footer: {
    width: '100%',
    paddingHorizontal: 40,
    paddingBottom: 50,
  },
  googleBtn: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.grey.light,
    marginBottom: 15,
  },
  googleBtnText: {
    color: COLORS.black,
  },
  emailBtn: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  emailBtnText: {
    ...FONTS.semibold.pt16,
    color: COLORS.primary.orange,
  },
});

export default Welcome;

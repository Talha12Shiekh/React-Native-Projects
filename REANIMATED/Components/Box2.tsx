import {
  Button,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
  TextInput,
} from 'react-native';
import React, {useEffect} from 'react';
import Animated, {
  cancelAnimation,
  scrollTo,
  useAnimatedProps,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useDerivedValue,
  useScrollViewOffset,
  useSharedValue,
  withClamp,
  withDelay,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {AnimatedScrollView} from 'react-native-reanimated/lib/typescript/component/ScrollView';

const SingleButton = ({
  text,
  handlePress,
}: {
  text: string;
  handlePress?: () => void;
}) => {
  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.btn}>
        <Text style={styles.btntext}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

const ITEM_SIZE = 150;
const MARGIN = 5;
const ITEM_COUNT = 10;

const Box2 = () => {
  const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);
  const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);
  const animatedRef = useAnimatedRef<Animated.ScrollView>();
  const scrollY = useSharedValue<number>(0);
  const scrollOffset = useScrollViewOffset(animatedRef);

  useDerivedValue(() => {
    scrollTo(animatedRef, 0, scrollY.value * (ITEM_SIZE + MARGIN), true);
  });

  const scrolloffsetderivedvalue = useDerivedValue(() => {
    return `Scroll Offset: ${scrollOffset.value.toFixed(2)}`;
  });

  const DATA = Array(ITEM_COUNT)
    .fill('')
    .map((e, i) => i);

  function handleButtonPress(increment: number) {
    scrollY.value += increment;
    if (scrollY.value >= ITEM_COUNT - 2 - 1) scrollY.value = 0;
    if (scrollY.value < 0) scrollY.value = ITEM_COUNT - 2;
  }

  const animatedvalue = useAnimatedProps(() => {
    return {
      text: scrolloffsetderivedvalue.value,
      defaultValue: scrolloffsetderivedvalue.value,
    };
  });

  return (
    <View style={styles.container}>
      <AnimatedTextInput animatedProps={animatedvalue} />
      <SingleButton
        text="Scroll Up"
        handlePress={() => handleButtonPress(-1)}
      />
      <View style={styles.boxescontainer}>
        <AnimatedScrollView ref={animatedRef}>
          {DATA.map(e => {
            return (
              <View style={styles.box} key={e}>
                <Text style={styles.boxtext}>{e + 1}</Text>
              </View>
            );
          })}
        </AnimatedScrollView>
      </View>
      <SingleButton
        text="Scroll Down"
        handlePress={() => handleButtonPress(1)}
      />
    </View>
  );
};

export default Box2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    flexDirection: 'column',
  },
  box: {
    height: ITEM_SIZE,
    width: ITEM_SIZE,
    backgroundColor: '#b58df1',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: MARGIN,
  },
  boxtext: {
    fontSize: 50,
  },
  boxescontainer: {
    height: 470,
  },
  btn: {
    backgroundColor: 'red',
    padding: 8,
    borderRadius: 10,
    paddingInline: 30,
    marginVertical: 10,
  },
  btntext: {
    color: 'white',
    fontSize: 20,
  },
});

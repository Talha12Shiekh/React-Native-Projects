import {Text, View, StyleSheet, Button} from 'react-native';
import Animated, {
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {useSharedValue, Easing} from 'react-native-reanimated';

const Box1 = () => {
  const translateX = useSharedValue<number>(0);

  function handlePress() {
    translateX.value += 50;
  }

  function handleResetAnimation() {
    translateX.value = withSpring(0);
  }

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withSpring(translateX.value * 2, {
            //mass: 100, // The mass of a spring influences how hard is it to make an object move and to bring it to a stop.
            // stiffness: 500, // Stiffness affects how bouncy the spring is
            // damping: 1, // Damping describes how quickly the spring animation finishes. Higher damping means the spring will come to rest faster.
          }),
        },
      ],
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.box, animatedStyles]} />
      <Button onPress={handlePress} title="Click me" />
      <Button onPress={handleResetAnimation} title="Reset Animation" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
  },
  box: {
    height: 100,
    width: 100,
    backgroundColor: 'violet',
    borderRadius: 10,
    marginBottom: 10,
  },
});

export default Box1;

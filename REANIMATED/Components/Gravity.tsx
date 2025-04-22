import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Animated, {
  ReducedMotionConfig,
  ReduceMotion,
  SensorType,
  useAnimatedSensor,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

const Gravity = () => {
  const gravity = useAnimatedSensor(SensorType.GRAVITY);

  const animatedstyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withSpring(gravity.sensor.value.x * 20),
        },
        {
          translateY: withSpring(gravity.sensor.value.y * 20),
        },
      ],
    };
  });

  return (
    <View style={styles.container}>
      <ReducedMotionConfig mode={ReduceMotion.Always} />
      <Animated.View style={[styles.box, animatedstyles]} />
    </View>
  );
};

export default Gravity;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: 'red',
    borderRadius: 10,
  },
});

import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Animated, {
  clamp,
  useAnimatedStyle,
  useFrameCallback,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const FrameCallBack = () => {
  const scale = useSharedValue(1);

  const framecallback = useFrameCallback(() => {
    scale.value += 0.5;
  }, false);

  const boxstyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: clamp(scale.value, 1, 4),
        },
      ],
    };
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => framecallback.setActive(!framecallback.isActive)}>
        <Animated.View style={[styles.box, boxstyles]} />
      </TouchableOpacity>
    </View>
  );
};

export default FrameCallBack;

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
    borderRadius: 50,
  },
});

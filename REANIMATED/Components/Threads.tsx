import {
  Button,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Animated, {
  interpolate,
  interpolateColor,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const Threads = () => {
  const widthanimation = useSharedValue<number>(0);
  const opacityanimation = useSharedValue<number>(1);
  const textanimation = useSharedValue<number>(0);

  function handleAnimateBar() {
    widthanimation.value = withTiming(1, {duration: 1000}, () => {
      opacityanimation.value = withTiming(0);
      textanimation.value = withTiming(1);
    });
  }

  const barstyles = useAnimatedStyle(() => {
    const interpolatedWidth = interpolate(
      widthanimation.value,
      [0, 1],
      [0, 100],
    );

    const interpolatedcolor = interpolateColor(
      widthanimation.value,
      [0, 1],
      ['red', 'lightgreen'],
    );

    return {
      width: `${interpolatedWidth}%`,
      backgroundColor: interpolatedcolor,
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={{transform: [{scale: textanimation}]}}>
        <Text style={styles.donetext}>Success ✅</Text>
      </Animated.View>

      <Animated.View style={[styles.bar, {opacity: opacityanimation}]}>
        <Animated.View style={[styles.progress, barstyles]} />
      </Animated.View>
      <View style={styles.btncontainer}>
        <Button title="Animate bar" onPress={handleAnimateBar} />
      </View>
    </View>
  );
};

export default Threads;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bar: {
    width: '95%',
    height: 10,
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 1,
  },
  btncontainer: {
    marginTop: 10,
  },
  progress: {
    backgroundColor: 'red',
    width: '50%',
    height: '100%',
  },
  donetext: {
    fontSize: 30,
  },
});

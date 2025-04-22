import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import Animated, {
  useAnimatedKeyboard,
  useAnimatedStyle,
} from 'react-native-reanimated';

const KeyBoard = () => {
  const keyboard = useAnimatedKeyboard();

  const animatedkeyboardstyles = useAnimatedStyle(() => ({
    transform: [{translateY: -keyboard.height.value}],
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.box, animatedkeyboardstyles]}>
        <TextInput
          style={styles.input}
          placeholderTextColor={'white'}
          placeholder="Enter text"
        />
      </Animated.View>
    </View>
  );
};

export default KeyBoard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: 300,
    height: 200,
    backgroundColor: 'red',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    height: '100%',
    color: 'white',
    fontSize: 30,
    textAlign: 'center',
  },
});

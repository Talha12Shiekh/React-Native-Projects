import {
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';

import ClipIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import EmojiIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import CameraIcon from 'react-native-vector-icons/Feather';
import AudioIcon from 'react-native-vector-icons/MaterialIcons';
import SendIcon from 'react-native-vector-icons/Ionicons';
import ArrowIcon from 'react-native-vector-icons/AntDesign';
import LockIcon from 'react-native-vector-icons/Entypo';
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedKeyboard,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
// sticker-emoji
// paperclip
// camera

const GREEN_COLOR = '#24c066';
const INPUT_BG = '#202629';
const GREY_COLOR = '#8c959a';
const LIGHT_RED_COLOR = '#ff6666db';
const ICON_SIZE = 20;

const Main = () => {
  const [inputHeight, setInputHeight] = useState(50);
  const [value, setvalue] = useState('');
  const sendIconAnimation = useSharedValue(0);
  const scaleAnimation = useSharedValue(1);
  const lockcontainerAnimation = useSharedValue(0);
  const bckandfrthanim = useSharedValue(0);
  const keyboard = useAnimatedKeyboard();

  const counterRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [count, setcount] = useState(0);

  const [showsendicon, setshowsendicon] = useState(false);

  useEffect(() => {
    if (value != '') {
      cameraDisappearAnimation.value = withTiming(
        40,
        {duration: 200},
        () => {},
      );
      sendIconAnimation.value = withSpring(1, {duration: 200}, () => {
        runOnJS(setshowsendicon)(true);
      });
    } else {
      cameraDisappearAnimation.value = withTiming(0, {duration: 200});
      sendIconAnimation.value = withSpring(0, {duration: 200}, () => {
        runOnJS(setshowsendicon)(false);
      });
    }
  }, [value]);

  const cameraDisappearAnimation = useSharedValue(0);

  const CameraAndClipStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: cameraDisappearAnimation.value,
        },
      ],
    };
  });

  const sendIconStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(sendIconAnimation.value, [0, 1], [0, 1]),
        },
      ],
    };
  });
  const audioIconStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(sendIconAnimation.value, [0, 1], [1, 0]),
        },
      ],
    };
  });

  const buttonScaleAnimationstyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: scaleAnimation.value,
        },
      ],
    };
  });

  function handleButtonScale() {
    if (!counterRef.current) {
      counterRef.current = setInterval(() => {
        setcount(p => p + 1);
      }, 1000);
    }
    scaleAnimation.value = withSpring(1.8);
    lockcontainerAnimation.value = withTiming(1, {}, () => {
      bckandfrthanim.value = withRepeat(withTiming(1), -1, true);
    });
  }
  function handleScaleOut() {
    if (counterRef.current) {
      clearInterval(counterRef.current);
      counterRef.current = null;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    timeoutRef.current = setTimeout(() => {
      setcount(0);
    }, 500);
    scaleAnimation.value = withSpring(1);
    lockcontainerAnimation.value = withTiming(0);
    bckandfrthanim.value = 0;
  }

  const lockcontainerstyles = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        lockcontainerAnimation.value,
        [0, 0.5, 1],
        [0, 0, 1],
      ),
      transform: [
        {
          translateY: interpolate(
            lockcontainerAnimation.value,
            [0, 1],
            [80, 0],
          ),
        },
      ],
    };
  });

  const newlockcontainerstyles = useAnimatedStyle(() => {
    return {
      transform: [
        {translateY: interpolate(bckandfrthanim.value, [0, 1], [0, 8])},
      ],
    };
  });

  const arrowmovestyles = useAnimatedStyle(() => {
    return {
      transform: [
        {translateY: interpolate(bckandfrthanim.value, [0, 1], [0, 5])},
        {rotate: '-90deg'},
      ],
    };
  });

  const {width} = Dimensions.get('screen');

  const animatedaudiocontainerstyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withTiming(
            interpolate(lockcontainerAnimation.value, [0, 1], [width, 0]),
            {duration: 100},
          ),
        },
      ],
      opacity: withTiming(
        interpolate(lockcontainerAnimation.value, [0, 0.5, 1], [0, 0, 1]),
        {duration: 100},
      ),
    };
  });

  const AnimatedKeyboardStyles = useAnimatedStyle(() => ({
    transform: [{translateY: -keyboard.height.value}],
  }));

  return (
    <Animated.View style={[styles.container, AnimatedKeyboardStyles]}>
      <View style={styles.inputandbtncontainer}>
        <View style={[styles.input, {height: inputHeight}]}>
          <View style={styles.emojiicon}>
            <TouchableOpacity>
              <EmojiIcon
                name="sticker-emoji"
                size={ICON_SIZE}
                color={GREY_COLOR}
              />
            </TouchableOpacity>
          </View>
          <TextInput
            multiline
            placeholderTextColor={GREY_COLOR}
            placeholder="Message"
            value={value}
            onChangeText={v => setvalue(v)}
            style={[styles.textinput, {color: GREY_COLOR}]}
            onContentSizeChange={e =>
              setInputHeight(Math.max(50, e.nativeEvent.contentSize.height))
            }
          />
          <Animated.View
            style={[styles.clipandcameracontainer, CameraAndClipStyles]}>
            <TouchableOpacity>
              <ClipIcon name="paperclip" size={ICON_SIZE} color={GREY_COLOR} />
            </TouchableOpacity>
            <TouchableOpacity>
              <CameraIcon name="camera" size={ICON_SIZE} color={GREY_COLOR} />
            </TouchableOpacity>
          </Animated.View>
          <Animated.View
            style={[styles.audiocancelcontainer, animatedaudiocontainerstyles]}>
            <View style={styles.timercontainer}>
              <Animated.View style={{opacity: bckandfrthanim}}>
                <AudioIcon
                  size={25}
                  color={LIGHT_RED_COLOR}
                  name="keyboard-voice"
                />
              </Animated.View>
              <Text style={styles.timer}>
                {`${String(Math.floor(count / 60)).padStart(2, '0')}:${String(
                  count % 60,
                ).padStart(2, '0')}`}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 8,
              }}>
              <View style={{transform: [{rotate: '180deg'}]}}>
                <ArrowIcon name="right" size={12} color={GREY_COLOR} />
              </View>
              <Text style={styles.canceltext}>Slide to cancel</Text>
            </View>
          </Animated.View>
        </View>

        <Animated.View
          style={[
            styles.lockcontainer,
            lockcontainerstyles,
            newlockcontainerstyles,
          ]}>
          <View>
            <LockIcon name="lock" size={20} color="white" />
          </View>
          <Animated.View style={[arrowmovestyles]}>
            <ArrowIcon name="right" size={10} color="white" />
          </Animated.View>
        </Animated.View>
        <Pressable
          style={{flex: 1}}
          onPressIn={handleButtonScale}
          onPressOut={handleScaleOut}>
          <Animated.View style={[styles.btn, buttonScaleAnimationstyles]}>
            {!showsendicon && (
              <Animated.View style={audioIconStyles}>
                <AudioIcon size={25} name="keyboard-voice" />
              </Animated.View>
            )}
            {showsendicon && (
              <Animated.View style={sendIconStyles}>
                <SendIcon size={ICON_SIZE} name="send-sharp" />
              </Animated.View>
            )}
          </Animated.View>
        </Pressable>
      </View>
    </Animated.View>
  );
};

export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 10,
  },
  inputandbtncontainer: {
    width: '95%',
    height: 50,
    flexDirection: 'row',
    gap: 8,
    alignItems: 'flex-end',
    position: 'relative',
  },
  input: {
    height: '100%',
    width: '85%',
    backgroundColor: INPUT_BG,
    borderRadius: 30,
    paddingHorizontal: 45,
    position: 'relative',
    paddingRight: 75,
  },
  btn: {
    backgroundColor: GREEN_COLOR,
    width: 50,
    height: '100%',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textinput: {
    width: '100%',
    height: '100%',
    fontSize: 18,
  },
  emojiicon: {
    position: 'absolute',
    left: 15,
    bottom: 14,
  },
  clipandcameracontainer: {
    flexDirection: 'row',
    position: 'absolute',
    right: 15,
    // right: -25,
    bottom: 14,
    gap: 20,
  },
  lockcontainer: {
    width: 50,
    position: 'absolute',
    backgroundColor: INPUT_BG,
    height: 170,
    right: 0,
    borderRadius: 50,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 20,
    gap: 10,
  },
  audiocancelcontainer: {
    position: 'absolute',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: INPUT_BG,
    borderRadius: 30,
    right: 0,
    left: 0,
    bottom: 0,
    top: 0,
    paddingHorizontal: 10,
  },
  timer: {
    color: GREY_COLOR,
    fontSize: 20,
  },
  timercontainer: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  canceltext: {
    color: GREY_COLOR,
    fontSize: 15,
    marginRight: 15,
  },
});

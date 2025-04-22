import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import Animated, {
  FadeInRight,
  interpolate,
  interpolateColor,
  runOnJS,
  SharedValue,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withSpring,
} from 'react-native-reanimated';

const USERS = [
  {name: 'Alice', score: 22},
  {name: 'Bob', score: 64},
  {name: 'Charlie', score: 8},
  {name: 'Catalin', score: 15},
  {name: 'Adam', score: 53},
  {name: 'David', score: 30},
  {name: 'Eve', score: 41},
];

const _avatarsize = 40;
const _spacing = 4;
const _stagger = 50;

type PlaceProps = {
  item: (typeof USERS)[0];
  index: number;
  onFinish?: () => void;
  anim: SharedValue<number>;
};

const Place = ({item, index, onFinish, anim}: PlaceProps) => {
  const _anim = useDerivedValue(() => {
    return withDelay(
      _stagger * index,
      withSpring(anim.value, {
        damping: 80,
        stiffness: 200,
      }),
    );
  });

  const stylez = useAnimatedStyle(() => {
    return {
      height: interpolate(
        _anim.value,
        [0, 1],
        [_avatarsize, Math.max(item.score * 3, _avatarsize)],
      ),

      backgroundColor:
        index == 4
          ? interpolateColor(
              _anim.value,

              [0, 1],

              ['rgba(0,0,0,0.1)', 'turquoise'],
            )
          : 'rgba(0,0,0,0.1)',
    };
  });

  const textstylez = useAnimatedStyle(() => ({
    opacity: interpolate(_anim.value, [0, 0.5, 1], [0, 0, 1]),
  }));

  return (
    <Animated.View
      entering={FadeInRight.delay(_stagger * index)
        .springify()
        .damping(200)
        .stiffness(200)
        .withCallback(finished => {
          if (onFinish && finished) {
            runOnJS(onFinish)();
          }
        })}>
      <Animated.Text
        style={[
          {textAlign: 'center', fontSize: 10, fontWeight: 'bold'},
          textstylez,
        ]}>
        {item.score}
      </Animated.Text>
      <Animated.View
        style={[
          {
            width: _avatarsize,
            height: _avatarsize,
            borderRadius: _avatarsize,
          },
          stylez,
        ]}>
        <View style={{width: _avatarsize, aspectRatio: 1}}>
          <Image
            style={{flex: 1, borderRadius: _avatarsize}}
            source={{uri: `https://i.pravatar.cc/50?u=user_${item.name}`}}
          />
        </View>
      </Animated.View>
    </Animated.View>
  );
};

const LeaderBoard = () => {
  const animation = useSharedValue(0);

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          gap: _spacing,
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
          height: 400,
        }}>
        {USERS.map((item, index) => {
          return (
            <Place
              key={index}
              index={index}
              item={item}
              anim={animation}
              onFinish={
                index == USERS.length - 1
                  ? () => {
                      animation.value = 1;
                      console.log('Finished');
                    }
                  : undefined
              }
            />
          );
        })}
      </View>
    </View>
  );
};

export default LeaderBoard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

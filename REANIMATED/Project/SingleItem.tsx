import {Image, StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import React from 'react';
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

const SingleItem = ({
  scrollvalue,
  unqindex,
  item,
}: {
  scrollvalue: SharedValue<number>;
  unqindex: number;
  item: string;
}) => {
  const {width} = useWindowDimensions();

  const ITEM_SIZE = width * 0.25;
  const GAP = ITEM_SIZE * 0.1;
  const MARGIN_LEFT = width / 3;
  const MARGIN_BOTTOM = width / 5;

  const translatestyles = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(
          scrollvalue.value,
          [
            (unqindex - 1) * ITEM_SIZE,
            unqindex * ITEM_SIZE,
            (unqindex + 1) * ITEM_SIZE,
          ],
          [50, 0, 50],
        ),
      },
    ],
  }));

  return (
    <Animated.View
      style={[
        styles.singlebottomitem,
        {
          width: ITEM_SIZE,
          height: ITEM_SIZE,
          marginRight: GAP,
          marginLeft: unqindex == 0 ? MARGIN_LEFT : 0,
          marginBottom: MARGIN_BOTTOM,
        },
        translatestyles,
      ]}>
      <Image style={{width: '100%', height: '100%'}} source={{uri: item}} />
    </Animated.View>
  );
};

export default SingleItem;

const styles = StyleSheet.create({
  singlebottomitem: {
    backgroundColor: 'red',
    borderRadius: 100,
    overflow: 'hidden',
  },
});

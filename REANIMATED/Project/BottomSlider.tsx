import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import React from 'react';
import Animated, {
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import SingleItem from './SingleItem';

const BottomSlider = ({data}: {data: string[]}) => {
  const scrollvalue = useSharedValue(0);

  const {width} = useWindowDimensions();

  const ITEM_SIZE = width * 0.25;

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: e => {
      scrollvalue.value = e.contentOffset.x;
    },
  });

  return (
    <View style={[styles.bottomitemscontainer]}>
      <Animated.FlatList
        showsHorizontalScrollIndicator={false}
        onScroll={scrollHandler}
        data={data}
        horizontal
        snapToInterval={ITEM_SIZE}
        renderItem={({item, index}) => {
          return (
            <SingleItem
              scrollvalue={scrollvalue}
              unqindex={index}
              item={item}
            />
          );
        }}
        keyExtractor={item => `key-${item}`}
      />
    </View>
  );
};

export default BottomSlider;

const styles = StyleSheet.create({
  singlebottomitem: {
    backgroundColor: 'red',
    borderRadius: 100,
    overflow: 'hidden',
  },
  bottomitemscontainer: {
    flexDirection: 'row',
  },
});

import {
  Dimensions,
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Animated, {
  clamp,
  Extrapolation,
  FadeIn,
  FadeOut,
  interpolate,
  interpolateColor,
  runOnJS,
  SharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

const data = [
  'https://cdn.dribbble.com/users/3281732/screenshots/11192830/media/7690704fa8f0566d572a085637dd1eee.jpg?compress=1&resize=1200x1200',
  'https://cdn.dribbble.com/users/3281732/screenshots/13130602/media/592ccac0a949b39f058a297fd1faa38e.jpg?compress=1&resize=1200x1200',
  'https://cdn.dribbble.com/users/3281732/screenshots/9165292/media/ccbfbce040e1941972dbc6a378c35e98.jpg?compress=1&resize=1200x1200',
  'https://cdn.dribbble.com/users/3281732/screenshots/11205211/media/44c854b0a6e381340fbefe276e03e8e4.jpg?compress=1&resize=1200x1200',
  'https://cdn.dribbble.com/users/3281732/screenshots/7003560/media/48d5ac3503d204751a2890ba82cc42ad.jpg?compress=1&resize=1200x1200',
  'https://cdn.dribbble.com/users/3281732/screenshots/6727912/samji_illustrator.jpeg?compress=1&resize=1200x1200',
  'https://cdn.dribbble.com/users/3281732/screenshots/13661330/media/1d9d3cd01504fa3f5ae5016e5ec3a313.jpg?compress=1&resize=1200x1200',
];

const {width} = Dimensions.get('screen');

const _itemsize = width * 0.23;
const _spacing = 12;
const _itemtotalsize = _itemsize + _spacing;

const CarouselItem = ({
  imageURI,
  index,
  scrollX,
}: {
  imageURI: string;
  index: number;
  scrollX: SharedValue<number>;
}) => {
  const animatedstyles = useAnimatedStyle(() => {
    return {
      borderColor: interpolateColor(
        scrollX.value,
        [index - 1, index, index + 1],
        ['transparent', 'white', 'transparent'],
      ),
      borderWidth: 4,
      transform: [
        {
          translateY: interpolate(
            scrollX.value,
            [index - 1, index, index + 1],
            [_itemsize / 3, 0, _itemsize / 3],
          ),
        },
      ],
    };
  });

  return (
    <Animated.View
      style={[
        {
          width: _itemsize,
          height: _itemsize,
          borderRadius: _itemsize / 2,
        },
        animatedstyles,
      ]}>
      <Image
        source={{uri: imageURI}}
        style={{
          flex: 1,
          borderRadius: _itemsize / 2,
        }}
      />
    </Animated.View>
  );
};

const OrgProject = () => {
  const scrollX = useSharedValue<number>(0);
  const [activeindex, setactiveindex] = useState(0);

  const onScroll = useAnimatedScrollHandler(e => {
    scrollX.value = clamp(
      e.contentOffset.x / _itemtotalsize,
      0,
      data.length - 1,
    );
    const newActiveIndex = Math.round(scrollX.value);

    if (newActiveIndex != activeindex) {
      runOnJS(setactiveindex)(newActiveIndex);
    }
  });

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <View style={StyleSheet.absoluteFillObject}>
        <Animated.Image
          entering={FadeIn.duration(500)}
          exiting={FadeOut.duration(500)}
          key={`image-${activeindex}`}
          style={{flex: 1}}
          source={{uri: data[activeindex]}}
        />
      </View>
      <Animated.FlatList
        style={{flexGrow: 0, height: _itemsize * 2}}
        contentContainerStyle={{
          paddingHorizontal: (width - _itemsize) / 2,
          gap: _spacing,
        }}
        data={data}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({item, index}) => {
          return (
            <CarouselItem imageURI={item} index={index} scrollX={scrollX} />
          );
        }}
        onScroll={onScroll}
        scrollEventThrottle={16} // it applies the concept of throttling
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={_itemtotalsize} // size of the image = size + margin
        decelerationRate="fast" // A floating-point number that determines how quickly the scroll view decelerates after the user lifts their finger
      />
    </View>
  );
};

export default OrgProject;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'black',
  },
});

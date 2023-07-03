import React, { useRef } from 'react';
import {
  Animated,
  useWindowDimensions,
  Image,
  FlatList,
  Text,
  View,
  StyleSheet,
  StatusBar
} from 'react-native';

const images = [
  require("./IMAGES/elephant.jpg"),
  require("./IMAGES/jellyfist.jpg"),
  require("./IMAGES/lion.jpg"),
  require("./IMAGES/lion1.jpg"),
  require("./IMAGES/lion2.jpg"),
  require("./IMAGES/monkey.jpg"),
  require("./IMAGES/tiger.jpg"),
  require("./IMAGES/unknownanimal.jpg"),
  require("./IMAGES/zebra.jpg"),
];
const data = images.map((image, index) => ({
  key: String(index),
  photo: image,
  avatar_url: `https://randomuser.me/api/portraits/women/${Math.floor(
    Math.random() * 40
  )}.jpg`,
}));

const Parallex = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const { width } = useWindowDimensions();
  const ITEM_WIDTH = width * 0.76;
  const ITEM_HEIGHT = ITEM_WIDTH * 1.47;
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <FlatList
        data={data}
        keyExtractor={(item) => item.key}
        horizontal
        pagingEnabled
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: false })}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => {
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
          ]
          const translateX = scrollX.interpolate({
            inputRange,
            outputRange: [-width * .7, 0, width * .7]
          });

          return (
            <View style={{ width, justifyContent: "center", alignItems: "center", backgroundColor: "grey" }}>
              <View style={{
                borderRadius: 15,
                shadowColor: "white",
                shadowOffset: {
                  width: 0,
                  height: 15,
                },
                shadowOpacity: 0.24,
                shadowRadius: 16.41,
                elevation: 20,
                padding: 10,
                backgroundColor: "white"
              }}>
                <View
                  style={{
                    width: ITEM_WIDTH,
                    height: ITEM_HEIGHT,
                    overflow: "hidden",
                    alignItems: "center",
                    borderRadius: 10
                  }}
                >
                  <Animated.Image
                    source={item.photo}
                    style={{
                      width: ITEM_WIDTH * 1.4,
                      height: ITEM_HEIGHT,
                      transform: [
                        { translateX, }
                      ]
                    }}
                    resizeMode="cover" />
                </View>
              </View>
              <Image
                source={{ uri: item.avatar_url }}
                style={{
                  width: 60, height: 60, borderRadius: 60, borderWidth: 6, borderColor: "white"
                  , position: "absolute", bottom: ITEM_HEIGHT / 3, right: 60
                }} />
            </View>
          )
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Parallex;
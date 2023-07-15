import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  Image,
  Animated,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
const userSlides = [
  {
    id:1,
    name:"Usman ali",
    number:"02234114873",
    email:"Usi123@gmail.com",
    image:"https://raw.githubusercontent.com/Talha12Shiekh/STUDENTS-APP/master/assets/student1.png"
  },
  {
    id:2,
    name:"Fahad Hameed",
    number:"023334567",
    email:"Fahad@gmail.com",
    image:"https://raw.githubusercontent.com/Talha12Shiekh/STUDENTS-APP/master/assets/student2.png"
  },
  {
    id:3,
    name:"Ali abdullah",
    email:"Ali244@gmail.com",
    number:"034115873",
    image:"https://raw.githubusercontent.com/Talha12Shiekh/STUDENTS-APP/master/assets/student3.png"
  },
  {
    id:4,
    name:"Hamad Al Hamad",
    email:"Hami@gmail.com",
    number:"034515883",
    image:"https://raw.githubusercontent.com/Talha12Shiekh/STUDENTS-APP/master/assets/student4.png"
  },
  {
    id:5,
    name:"Faizan Riaz",
    number:"0321155673",
    email:"Riizi@gmail.com",
    image:"https://raw.githubusercontent.com/Talha12Shiekh/STUDENTS-APP/master/assets/student5.png"
  },
];


const Courasel = () => {
  const { width } = Dimensions.get('screen');
  const ScrollX = React.useRef(new Animated.Value(0)).current;
  const imageW = width * 0.7;
  const imageH = imageW * 1.54;
  const ref = React.useRef(null);
  const [currentindex, setcurrentindex] = React.useState(0);

  const handleScroll = (eve) => {
    let index = Math.round(eve.nativeEvent.contentOffset.x / width);
    setcurrentindex(index);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar hidden />
      <Animated.FlatList
        data={userSlides}
        ref={ref}
        horizontal
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        keyExtractor={(_) => _.id}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: ScrollX } } }],
          { useNativeDriver: false, listener: handleScroll }
        )}
        renderItem={({ item, index }) => {
          const inputRange = [
            width * (index - 1),
            width * index,
            width * (index + 1),
          ];
          const scale = ScrollX.interpolate({
            inputRange,
            outputRange: [0.6, 1.1, 0.6],
            extrapolate: 'clamp',
          });
          const opacity = ScrollX.interpolate({
            inputRange: [
              width * (index - 1),
              width * (index - 0.4),
              width * index,
              width * (index + 0.4),
              width * (index + 1),
            ],
            outputRange: [0, 0, 1, 0, 0],
            extrapolate: 'clamp',
          });
          return (
            <>
              <View
                style={{
                  width,
                  justifyContent: 'center',
                  alignItems: 'center',
                  shadowColor: '#000',
                  shadowOpacity: 1,
                  shadowOffset: {
                    width: 0,
                    height: 0,
                  },
                  shadowRadius: 20,
                  elevation: 8,
                }}>
                <Animated.Image
                  source={{ uri: item.image }}
                  style={{
                    width: imageW,
                    height: imageH,
                    borderRadius: 16,
                    marginBottom: 20,
                    transform: [{ scale }],
                  }}
                  resizeMode="cover"
                />
                <Animated.Text
                  style={{
                    marginBottom: 3,
                    fontSize: 30,
                    opacity,
                  }}>
                  <Text style={{ fontWeight: 'bold' }}>Name</Text> : {item.name}
                </Animated.Text>
                <Animated.Text
                  style={{
                    textAlign: 'center',
                    paddingTop: 5,
                    marginBottom: 3,
                    fontSize: 25,
                    opacity,
                  }}>
                  <Text style={{ fontWeight: 'bold', fontSize: 30 }}>
                    Email
                  </Text>
                  : {item.email}
                </Animated.Text>
              </View>
            </>
          );
        }}
      />
      <View
        style={{
          width: '90%',
          alignSelf: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 30,
        }}>
        <View>
          {currentindex !== 0 && (
            <TouchableOpacity
              onPress={() => {
                ref.current.scrollToIndex({
                  animated: true,
                  index: currentindex - 1,
                });
              }}>
              <Text style={styles.text}>Prev</Text>
            </TouchableOpacity>
          )}
        </View>
        <View>
          <View style={styles.indicatorContainer}>
            <FlatList
              data={userSlides}
              horizontal
              keyExtractor={(i) => i.id}
              renderItem={({ item, index }) => {
                const width = ScrollX.interpolate({
                  inputRange: [
                    imageW * (index - 1),
                    imageW * index,
                    imageW * (index + 1),
                  ],
                  outputRange: [8, 16, 8],
                  extrapolate: 'clamp',
                });
                return (
                  <Animated.View
                    key={index}
                    style={[styles.normalDot, { width }]}
                  />
                );
              }}
            />
          </View>
        </View>
        <View>
          {currentindex < userSlides.length - 1 ? (
            <TouchableOpacity
              onPress={() => {
                ref.current.scrollToIndex({
                  animated: true,
                  index: currentindex + 1,
                });
              }}>
              <Text style={styles.text}>Next</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                ref.current.scrollToIndex({
                  animated: true,
                  index: 0,
                });
              }}>
              <Text style={styles.text}>Done</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: '#000',
    fontSize: 25,
  },
  normalDot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: 'red',
    marginHorizontal: 4,
  },
  indicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Courasel;

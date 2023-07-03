import { StyleSheet, Text, View,ScrollView,useWindowDimensions, Animated } from 'react-native'
import React, { useRef } from 'react';
import Moment from './Moment';

const ParallexSlider = () => {
    const { width,height } = useWindowDimensions();

    const animatedScroll = useRef(new Animated.Value(0)).current

    const IMAGES = [
        { image:require("./IMAGES/lion.jpg") , title: "Dangerous one" },
        { image:require("./IMAGES/lion1.jpg") , title: "Be your self" },
        { image:require("./IMAGES/lion2.jpg") , title: "Underestimated" },
        { image:require("./IMAGES/monkey.jpg") , title: "Just chill" },
    ];

    function getInterpolate(animatedScroll,i,imageslength){
        const inputRange = [
            width * (i - 1),
            width * i ,
            width * (i + 1) ,
        ];
        const outputRange = i === 0 ?  [0,0,150] : [-300,0,150];

        return animatedScroll.interpolate({
            inputRange,
            outputRange,
            extrapolate:"clamp"
        })
    };

    const getSeperator = (i) => {
        return <View 
        key={i}
        style={[styles.seperator,{left : (i - 1 ) * width -2.5}]}
        />
    }

  return (
    <View style={styles.container}>
      <ScrollView
      pagingEnabled
      horizontal
      scrollEventThrottle={16}
      onScroll={Animated.event([
        {
            nativeEvent:{
                contentOffset:{
                    x:animatedScroll
                }
            }
        }
      ],{useNativeDriver:false})}
      >
    {IMAGES.map(({image,title},i,imagesarr) => {
        return <Moment
        key={i}
        image={image}
        title={title}
        translateX={getInterpolate(animatedScroll,i,imagesarr.length)}
        />
    })}
    {Array.apply(null,{length:IMAGES.length - 1}).map((_,i) => getSeperator(i))}
      </ScrollView>
    </View>
  )
}

export default ParallexSlider

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    seperator:{
        backgroundColor:"black",
        position:"absolute",
        top:0,
        bottom:0,
        width:5
    }
})
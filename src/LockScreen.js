import { Animated, Image, ImageBackground, PanResponder, SafeAreaView, StatusBar, StyleSheet, Text, useWindowDimensions, View } from 'react-native'
import React, { useRef } from 'react'
import Camera from "react-native-vector-icons/Entypo"
import Phome from "react-native-vector-icons/Entypo"
import Folder from "react-native-vector-icons/Foundation"
import Lock from "react-native-vector-icons/Fontisto";
import styles from "./LockscreenStyles"

const LockScreen = () => {

  const scale = useRef(new Animated.Value(1)).current
  const opacity = useRef(new Animated.Value(1)).current
  const translateY = useRef(new Animated.Value(0)).current;
  const fadingOpacity = useRef(new Animated.Value(1)).current;
  const iconsAnimation = new Animated.Value(0);

  const data = new Date(), hours = data.getHours(), minutes = data.getMinutes(), day=data.getDay(), date=data.getDate(), month=data.getMonth();


  const monthNames= ["January","February","March","April","May","June","July",
            "August","September","October","November","December"];
  const daysNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
          

  const panresponder = PanResponder.create({
    onStartShouldSetPanResponder:() => true,
    onMoveShouldSetPanResponder:() => true,
    onPanResponderMove:(e,{dy}) => {
      Animated.parallel([
        Animated.spring(iconsAnimation,{
          toValue:65,
          // bounciness:4,
          duration:500,
          useNativeDriver:true
        }),
        Animated.timing(fadingOpacity,{
          toValue:0,
          duration:200,
          useNativeDriver:true
        }),
        Animated.spring(translateY,{
          toValue:dy > 1 ? -dy : dy,
          duration:400,
          useNativeDriver:true
        })
      ]).start()
    },

    onPanResponderRelease:() => {
      Animated.parallel([
        Animated.timing(fadingOpacity,{
          toValue:1,
          duration:200,
          useNativeDriver:true
        }),
        Animated.spring(translateY,{
          toValue:0,
          duration:400,
          useNativeDriver:true
        }),
        Animated.timing(opacity,{
          toValue:0,
          duration:400,
          useNativeDriver:true
        }),
        Animated.timing(scale,{
          toValue:0,
          duration:400,
          useNativeDriver:true
        }),
        Animated.spring(iconsAnimation,{
          toValue:0,
          duration:500,
          useNativeDriver:true
        })
      ]).start()
    }
  });

  const opacityAnimation = translateY.interpolate({
    inputRange:[-140,0],
    outputRange:[0,1]
  });
  const scaleAnimation = translateY.interpolate({
    inputRange:[-140,0],
    outputRange:[1.4,1]
  });

  const animatedStyles = {
    opacity:opacityAnimation,
    transform:[{scale:scaleAnimation},{translateY}]
  }

  const AnimatedIconStyles = {
  }
  const {width,height} = useWindowDimensions()
  return (
    <View style={[StyleSheet.absoluteFillObject,{backgroundColor:'pink'}]}>
      <StatusBar backgroundColor="transparent" translucent />
      <ImageBackground source={require("./IMAGES/talha.jpeg")} style={[StyleSheet.absoluteFillObject,styles.image]}>
          <View style={[styles.textscontainer]} {...panresponder.panHandlers}>
            <Animated.View style={{display:"flex",justifyContent:"center",alignItems:"center",opacity:fadingOpacity}}>
            <Lock name='locked' style={styles.lock}/>
            </Animated.View>
            <View style={[styles.timeContainer]}>
              <Animated.Text style={[styles.time,animatedStyles]}>{hours + 1}:{minutes < 10 ? "0"+minutes:minutes}</Animated.Text>
              <Animated.Text style={[styles.date,animatedStyles]}>{daysNames[day]},{date} {monthNames[month]}</Animated.Text>
              <Animated.View style={[styles.folderContainer,animatedStyles]}>
                <Folder name='folder' style={styles.folder}/>
              </Animated.View>
            </View>
            <View style={[styles.bottomContainer,{width,height:height/8}]}>
              <Animated.Text style={[styles.bottomText,{opacity:fadingOpacity}]}>Connect charger</Animated.Text>
              <View style={styles.iconsContainer}>
                <Animated.View style={[styles.iconBackground,{transform:[{translateY:iconsAnimation}]}]}>
                  <Phome name='phone'  style={styles.icon}/>
                </Animated.View>
                <Animated.View style={[styles.iconBackground,{transform:[{translateY:iconsAnimation}]}]}>
                  <Camera name='camera'  style={styles.icon}/>
                </Animated.View>
              </View>
            </View>
          </View>
      </ImageBackground>
    </View>
  )
}

export default LockScreen


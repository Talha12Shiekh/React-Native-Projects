import React from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Animated,
    Text,
    useWindowDimensions
  } from 'react-native';
  import Clockcircle from "react-native-vector-icons/AntDesign"
  
  const ColorAnimation = () => {
    const colorAnim = React.useRef(new Animated.Value(0)).current;
    const leftANim = React.useRef(new Animated.Value(-280)).current;
    const [open,setopen] = React.useState(false);
    const {width,height} = useWindowDimensions()
    function FucntionColorAnimation(){
        setopen(!open)
        if(open){
            Animated.timing(leftANim,{
                toValue:3,
                duration:1500,
                useNativeDriver:false
            }).start()
        }else{
            Animated.timing(leftANim,{
                toValue:-280,
                duration:1500,
                useNativeDriver:false
            }).start()
        }
      Animated.timing(colorAnim,{
        toValue:1,
        duration:300,
        useNativeDriver:false
      }).start(() => {
        colorAnim.setValue(0)
      })
    }
    const colorInterpolation = colorAnim.interpolate({
      inputRange:[0,1],
      outputRange: ["rgba(255,255,255,1)", "rgba(128,128,128,0.34)"],
    })
    
    return (
        <>
      <View style={styles.container}>
        <Animated.View style={{position:"absolute",backgroundColor:"red",width:width/2,height:height,marginTop:10,zIndex:222,top:0,bottom:0,left:leftANim}}>

        </Animated.View>
      <TouchableOpacity onPress={FucntionColorAnimation} style={styles.button}>
          <Animated.View style={[styles.box,{
            backgroundColor:colorInterpolation
          }]}>
            <Clockcircle name='clockcircle' style={styles.clock}/>
          </Animated.View>
      </TouchableOpacity>
      </View>
      </>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
    backgroundColor:"black",
      flex:1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
      position:"relative"
    },
    box: {
        padding:15,
        borderRadius:50,
        zIndex:3333
    },
    clock:{
        fontSize:50
    },
    text:{
        color:"black",
        fontSize:35
    },
  });
  
  export default ColorAnimation;
  
import { Animated, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native'
import React, { useEffect, useState } from 'react'

const FloatingHearts = () => {
    const [hearts,sethearts] = useState([]);
    const {width,height} = useWindowDimensions();
    const animation = new Animated.Value(0);


    function getRandomInt(min,max){
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    };
    
    function handleAddHeart(){
        sethearts((hrts) => {
           return  [...hrts,{animation,start:getRandomInt(100 ,width-100)}]
        })
    }

    useEffect(() => {
        Animated.timing(animation,{
            toValue:height,
            duration:3000,
            useNativeDriver:true
        }).start()
    },[hearts])

  return (
    <View style={styles.container}>
        <TouchableOpacity onPress={handleAddHeart} style={[StyleSheet.absoluteFill]}>
            <View style={[StyleSheet.absoluteFill]}>
                {hearts.map(({animation,start},index) => {
                    const positionInterpolate = animation.interpolate({
                        inputRange:[0,height],
                        outputRange:[height - 20,0]
                    });

                    const opacityInterpolate = animation.interpolate({
                        inputRange:[0,height - 100],
                        outputRange:[1,0]
                    });

                    const scaleInterpolate = animation.interpolate({
                        inputRange:[0,15,30],
                        outputRange:[0,1.2,1],
                        extrapolate:"clamp"
                    });

                    const dividedHeight = height / 6;
                    const wobbleInterpolate = animation.interpolate({
                        inputRange:[
                            0,
                            dividedHeight * 1,
                            dividedHeight * 2,
                            dividedHeight * 3,
                            dividedHeight * 4,
                            dividedHeight * 5,
                            dividedHeight * 6,
                        ],
                        outputRange:[
                            0,
                            15,
                            -15,
                            15,
                            -15,
                            15,
                            -15,
                        ],
                        extrapolate:"clamp"
                    })

                    const heartAnimatedStyles = {
                        left:start,
                        transform:[{
                            translateY:positionInterpolate
                        },{
                            scale:scaleInterpolate
                        },{
                            translateX:wobbleInterpolate
                        }],
                        opacity:opacityInterpolate
                    }

                    return <Heart key={index} style={heartAnimatedStyles}/>
                })}
            </View>
        </TouchableOpacity>
    </View>
  )
}


const Heart = ({style}) => {
    return (
        <Animated.View style={[styles.heart,style]}>
            <View style={[styles.heartShape,styles.leftHeart]}></View>
            <View style={[styles.heartShape,styles.rightHeart]}></View>
        </Animated.View>
    )
}

export default FloatingHearts

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    heart:{
        width:50,
        height:50,
        position:"absolute",
    },
    heartShape:{
        width:40,
        height:40,
        position:"absolute",
        top:0,
        borderTopLeftRadius: 15,
  borderTopRightRadius: 15,
        backgroundColor:"#6427d1"
    },
    leftHeart: {
        transform: [{ rotate: "-45deg" }],
        left: 5
    },
    rightHeart: {
        transform: [{ rotate: "45deg" }],
        left: 15
    },
})
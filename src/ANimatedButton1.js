import { Animated, StyleSheet, Text, View } from 'react-native'
import React, { useRef } from 'react'
import { TouchableOpacity } from 'react-native'

const ANimatedButton1 = () => {
    const animation = useRef(new Animated.Value(0)).current;
    const opacity = useRef(new Animated.Value(1)).current;
    const handlePress = () => {
        animation.setValue(0);
        opacity.setValue(1);

        Animated.timing(animation,{
            toValue:1,
            duration:800,
            useNativeDriver:false
        }).start(({finished}) => {
            if(finished){
                Animated.timing(opacity,{
                    toValue:0,
                    duration:500,
                    useNativeDriver:false
                }).start()
            }
        })
    }

    const progressInterpolate = animation.interpolate({
        inputRange:[0,1],
        outputRange:["0%","100%"],
        extrapolate:"clamp"
    })
    const colorInterpolate = animation.interpolate({
        inputRange:[0,1],
        outputRange: ["rgb(71,255,99)", "rgb(99,71,255)"],
    })

    const progressStyle = {
        // for the top coming animation

        // height:progressInterpolate,
        // right:0,

        // for the bar animation
        // width:progressInterpolate,
        // top:null,
        // height:5,
        // bottom:0,

        // for the left coming animaton

        width:progressInterpolate,
        bottom:0,

        backgroundColor:colorInterpolate,
        // backgroundColor:"rgba(255,255,255,0.5)",

        opacity,
    }
  return (
    <View style={styles.container}>
    <TouchableOpacity onPress={handlePress}>
        <View style={styles.button}>
            <View style={[StyleSheet.absoluteFill]}>
                <Animated.View style={[styles.progress,progressStyle]} />
            </View>
            <Text style={styles.buttonText}>Get it!</Text>
        </View>
    </TouchableOpacity>
    </View>
  )
}

export default ANimatedButton1

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    button: {
        backgroundColor: "#e6537d",
        borderRadius: 2,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 60,
        paddingVertical: 10,
        overflow: "hidden",
    },
    buttonText: {
        color: "#FFF",
        fontSize: 24,
        backgroundColor: "transparent",
    },
    progress: {
        position: "absolute",
        left: 0,
        top: 0,
        // backgroundColor:"green",
    },
});
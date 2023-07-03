import {
    StyleSheet,
    Text,
    View,
    Animated,
    TouchableWithoutFeedback,
    TouchableOpacity,
} from "react-native";
import React, { useRef } from 'react'

const AnimatedButton = () => {
    const state = {
        animation: useRef(new Animated.Value(0)).current,
        opacity: useRef(new Animated.Value(1)).current,
    };
    function handlePress() {
        const { animation, opacity } = state;

        Animated.timing(animation, {
            duration: 1500,
            toValue: 1,
        }).start(({ finished }) => {
            if (finished) {
                Animated.timing(opacity, {
                    toValue: 0,
                    duration: 200,
                }).start();
            }
        });
    }
    const progressInterpolate = state.animation.interpolate({
        inputRange: [0, 1],
        outputRange: ["0%", "100%"],
        extrapolate: "clamp",
      });

      const colorInterpolate = state.animation.interpolate({
        inputRange: [0, 1],
        outputRange: ["rgb(71,255,99)", "rgb(99,71,255)"],
      }); 
      
      const progressStyle = {
        top: null,
        bottom: 0,
        width: progressInterpolate,
        height: 5,
        opacity: state.opacity,
        backgroundColor: colorInterpolate,
      };
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

export default AnimatedButton

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
    },
});
import { StyleSheet, Text, View, Animated } from 'react-native'
import React from 'react'

const HeartShape = ({ style, filled, ...props }) => {
    const centerNonFilled = (
        <View style={[StyleSheet.absoluteFill, styles.fit]}>
            <View style={[styles.leftHeart, styles.HeartShape, fillStyle]}></View>
            <View style={[styles.rightHeart, styles.HeartShape, fillStyle]}></View>
        </View>
    )
    // const centerNonFilled = undefined;
    const fillStyle = filled ? styles.filledheart : styles.empty;

    return (
        <Animated.View style={[styles.heart, style]}>
            <View style={[styles.leftHeart, styles.HeartShape, fillStyle]}></View>
            <View style={[styles.rightHeart, styles.HeartShape, fillStyle]}></View>
            {!filled && centerNonFilled}
        </Animated.View>
    )
}

export default HeartShape

const styles = StyleSheet.create({
    heart: {
        width: 50,
        height: 50,
    },
    HeartShape: {
        width: 30, height: 45, position: "absolute", top: 0, borderTopLeftRadius: 15, borderTopRightRadius: 15,
    },
    filledheart: {
        backgroundColor: "#e31745"
    },
    fit: {
        transform: [{ scale: .9 }]
    },
    emptyFill: {
        backgroundColor: "#fff"
    },
    empty: { backgroundColor: "#ccc" },
    leftHeart: {
        transform: [{ rotate: "-45deg" }],
        left: 5
    },
    rightHeart: {
        transform: [{ rotate: "45deg" }],
        left: 15
    },
})
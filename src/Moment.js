import { StyleSheet, Text, View, Animated, useWindowDimensions, TouchableOpacity, Image } from 'react-native'
import React from 'react'

const Moment = ({ image, title ,translateX}) => {
    const { width, height } = useWindowDimensions();
    const animatedstyles = {
        transform:[
            {
                translateX,
            }
        ]
    }

    return (
        <Animated.View style={[styles.container, { width, height }]}>
            <Animated.Image
                source={image}
                style={[styles.image,animatedstyles]}
                resizeMode="cover"
            />
            <View style={[StyleSheet.absoluteFill, styles.center]}>
                <View style={styles.textWrap}>
                    <Text style={styles.titleText}>{title}</Text>
                </View>
            </View>
        </Animated.View>
    )
}

export default Moment

const styles = StyleSheet.create({
    container: {
        overflow: "hidden"
    },
    image: {
        flex: 1,
        width: null, height: null
    },
    center: {
        justifyContent: "center",
    },
    textWrap: {
        backgroundColor: "rgba(0,0,0,.5)",
        paddingVertical: 10
    },
    titleText: {
        backgroundColor: "transparent",
        fontSize: 30,
        color: '#fff',
        textAlign: "center"
    }
})
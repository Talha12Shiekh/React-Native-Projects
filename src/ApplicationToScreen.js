import { Animated, PixelRatio, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native'
import React, { useRef } from 'react';
import Image1 from "./IMAGES/imag1.png"
import Image2 from "./IMAGES/image2.png"
import Image3 from "./IMAGES/image3.png"

const getScreen1Styles = (animation, width) => {
    const ImageTwoTranslateX = animation.interpolate({
        inputRange: [0, width],
        outputRange: [0, -100],
        extrapolate: "clamp"
    });

    return {
        Image2: {
            transform: [{
                translateX: ImageTwoTranslateX
            }]
        }
    }
}

        const getScreen2Styles = (animation, width) => {
            const inputRange = [0,width,width * 2];

            const ImageTwoTranslateY = animation.interpolate({
                inputRange,
                outputRange:[100,0,-100],
                extrapolate: "clamp"
            });

            const opacityInterpolate = animation.interpolate({
                inputRange,
                outputRange:[0,1,0],
                extrapolate: "clamp"
            })

            return {
                Image2: {
                    opacity:opacityInterpolate,
                    transform: [{
                        translateY: ImageTwoTranslateY
                    }]
                }
            }
        }

        const getScreen3Styles = (animation, width) => {
            const inputRange = [width,width * 2,width * 3];

            const ImageScale = animation.interpolate({
                inputRange,
                outputRange:[0,1,0],
                extrapolate: "clamp"
            });

            const RotateImgae = animation.interpolate({
                inputRange,
                outputRange:["-180deg","0deg","180deg"],
                extrapolate: "clamp"
            });
            return {
                Image1:{
                    transform:[{scale:ImageScale}]
                },
                Image2:{
                    transform:[{scale:ImageScale},{rotate:RotateImgae}]
                }
            }
        }

const ApplicationToScreen = () => {
    const images = {
        Image1, Image2, Image3
    }
    const animation = useRef(new Animated.Value(0)).current;
    const { width, height } = useWindowDimensions();

    const screen1Styles = getScreen1Styles(animation, width);
    const screen2Styles = getScreen2Styles(animation, width);
    const screen3Styles = getScreen3Styles(animation, width);

    return (
        <View style={styles.container}>
            <ScrollView
                style={styles.container}
                pagingEnabled
                horizontal
                scrollEventThrottle={16}
                onScroll={Animated.event([
                    {
                        nativeEvent: {
                            contentOffset: {
                                x: animation
                            }
                        }
                    }
                ])}
            >
                <View style={{ width, height, backgroundColor: "#F89E20" }}>
                    <View style={styles.screenHeader}>
                        <Animated.Image
                            source={images.Image1}
                            style={[{ width: PixelRatio.getPixelSizeForLayoutSize(105), height: PixelRatio.getPixelSizeForLayoutSize(83) }]}
                            resizeMode="cover"
                        />
                        <Animated.Image
                            source={images.Image2}
                            style={[{ width: PixelRatio.getPixelSizeForLayoutSize(46), height: PixelRatio.getPixelSizeForLayoutSize(28), position: "absolute", top: 200, left: 60 },, screen1Styles.Image2]}
                            resizeMode="cover"
                        />
                        <Animated.Image
                            source={images.Image3}
                            style={{ width: PixelRatio.getPixelSizeForLayoutSize(23), height: PixelRatio.getPixelSizeForLayoutSize(17), position: "absolute", top: 150, left: 60 }}
                            resizeMode="cover"
                        />
                    </View>
                    <View style={styles.screenText}>
                        <Text style={styles.textStyle}>Screen 1</Text>
                    </View>
                </View>
                <View style={{ width, height, backgroundColor: "#F89E20" }}>
                    <View style={styles.screenHeader}>
                        <Animated.Image
                            source={images.Image1}
                            style={[{ width: PixelRatio.getPixelSizeForLayoutSize(105), height: PixelRatio.getPixelSizeForLayoutSize(83) }]}
                            resizeMode="cover"
                        />
                        <Animated.Image
                            source={images.Image2}
                            style={[{ width: PixelRatio.getPixelSizeForLayoutSize(46), height: PixelRatio.getPixelSizeForLayoutSize(28), position: "absolute", top: 200, left: 60 },screen2Styles.Image2]}
                            resizeMode="cover"
                        />
                        <Animated.Image
                            source={images.Image3}
                            style={{ width: PixelRatio.getPixelSizeForLayoutSize(23), height: PixelRatio.getPixelSizeForLayoutSize(17), position: "absolute", top: 150, left: 60 }}
                            resizeMode="cover"
                        />
                    </View>
                    <View style={styles.screenText}>
                        <Text style={styles.textStyle}>Screen 2</Text>
                    </View>
                </View>
                <View style={{ width, height, backgroundColor: "#F89E20" }}>
                    <View style={styles.screenHeader}>
                        <Animated.Image
                            source={images.Image1}
                            style={[{ width: PixelRatio.getPixelSizeForLayoutSize(105), height: PixelRatio.getPixelSizeForLayoutSize(83) },screen3Styles.Image1]}
                            resizeMode="cover"
                        />
                        <Animated.Image
                            source={images.Image2}
                            style={[{ width: PixelRatio.getPixelSizeForLayoutSize(46), height: PixelRatio.getPixelSizeForLayoutSize(28), position: "absolute", top: 200, left: 60 },screen3Styles.Image2]}
                            resizeMode="cover"
                        />
                        <Animated.Image
                            source={images.Image3}
                            style={{ width: PixelRatio.getPixelSizeForLayoutSize(23), height: PixelRatio.getPixelSizeForLayoutSize(17), position: "absolute", top: 150, left: 60 }}
                            resizeMode="cover"
                        />
                    </View>
                    <View style={styles.screenText}>
                        <Text style={styles.textStyle}>Screen 3</Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default ApplicationToScreen

const styles = StyleSheet.create({
    container: { flex: 1 ,paddingTop:10},
    screenHeader: { flex: 1, justifyContent: "center", alignItems: "center" },
    screenText: { flex: 1 },
    textStyle : {fontSize:60,textAlign:"center"}
})
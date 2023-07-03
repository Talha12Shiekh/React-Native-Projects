import React, { useEffect, useRef, useState,ReactDOM } from 'react'
import { Animated, FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import image1 from "./IMAGES/elephant.jpg"
import image2 from "./IMAGES/flower.webp"
import image3 from "./IMAGES/imag1.png"
import image4 from "./IMAGES/image2.png"
import image5 from "./IMAGES/image3.png"
import image6 from "./IMAGES/jellyfist.jpg"
import image7 from "./IMAGES/lion.jpg"
import image8 from "./IMAGES/lion1.jpg"
import image9 from "./IMAGES/lion2.jpg"
import image10 from "./IMAGES/monkey.jpg"
import image11 from "./IMAGES/monkey1.jpg"
import image12 from "./IMAGES/tiger.jpg";
import image13 from "./IMAGES/zebra.jpg";
import image14 from "./IMAGES/unknownanimal.jpg";
import image15 from "./IMAGES/image3.png"
import image16 from "./IMAGES/jellyfist.jpg"
import image17 from "./IMAGES/lion.jpg"
import image18 from "./IMAGES/lion1.jpg"


const PhotoGrid = () => {
    const [activeImage, setactiveImage] = useState(null);

    const [activeindex, setactiveindex] = useState(null);

    const gridImageRef = useRef(null);

    const [positionImage,setpositionImage] = useState({})

    const size = useRef(new Animated.ValueXY()).current;

    const position = useRef(new Animated.ValueXY()).current;

    const animation = useRef(new Animated.Value(0)).current;

    const [images, setimages] = useState([
        image1, image2, image3, image4, image5, image6, image7, image8, image9, image10, image11, image12,
        image13, image14, image15, image16, image17, image18
    ]);


    const ViewImageRef = useRef(null);

    const animatedContentTranslate = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [600, 0]
    });

    const animatedContentStyles = {
        opaciy: animation,
        transform: [
            {
                translateY: animatedContentTranslate
            }
        ]
    }


    const handleOpenImage = (index) => {
        gridImageRef.current.measure((x,y,width,height,pageX,pageY) => {
            setpositionImage({
                x:pageX,
                y:pageY,
                width,
                height,
            });

            position.setValue({
                x:pageX,
                y:pageY
            });

            size.setValue({
                x:width,
                y:height
            });

            setactiveImage(images[index]);
            setactiveindex(index)
        })
    }

    const activeImageStyles = {
        width:size.x,
        height:size.y,
        top:position.y,
        left:position.x
    }

    const activeIndexStyles = {
        opaciy:activeImage ? 0 : 1
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.gridcontainer}>
                    {images.map((src, index) => {
                        const style = index === activeindex ? activeIndexStyles : undefined;
                        return (
                            <TouchableWithoutFeedback key={index} onPress={() => handleOpenImage(index)}>
                                <Animated.Image
                                    source={src}
                                    style={[styles.gridImage,style]}
                                    resizeMode="cover"
                                    ref={gridImageRef}
                                />
                            </TouchableWithoutFeedback>
                        );
                    })}
                </View>
            </ScrollView>

            <View
                style={[StyleSheet.absoluteFill]}
                pointerEvents={activeImage ? "auto" : "none"}
            >
                <View
                    style={styles.topContent}
                    ref={ViewImageRef}
                >
                    <Animated.Image
                        key={activeImage}
                        source={activeImage}
                        resizeMode="cover"
                        style={styles.ViewImage}
                    />
                </View>
                <Animated.View style={[styles.content, animatedContentStyles]}>
                    <Text style={styles.tittle}>Pretty Images from unsplash</Text>
                    <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto harum temporibus, officiis odio, rerum sit molestias dolorum totam quasi recusandae in maxime officia optio. Fuga odit ut rerum qui, corporis nulla omnis vel velit nisi est nobis consequatur quaerat provident repellat ab quidem, a explicabo sapiente cum. Adipisci, totam id deleniti omnis repellendus praesentium.</Text>
                </Animated.View>
            </View>

        </View>
    )
}

export default PhotoGrid

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    gridImage: {
        width: "33%",
        height: 145
    },
    gridcontainer: {
        flexDirection: "row",
        flexWrap: "wrap"
    },
    topContent: {
        flex: 1,
    },
    content: {
        flex: 2,
        backgroundColor: "#fff"
    },
    ViewImage: {
        width: null, height: null, position: "absolute", top: 0, left: 0
    },
    tittle: {
        fontSize: 28
    }
})
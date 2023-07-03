import { Animated, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useRef, useState } from 'react'
import HeartShape from './HeartShape';

const HeartButton = () => {
    const [liked, setliked] = useState(false);
    const firstHeartAnimation = useRef(new Animated.Value(0)).current;
    const secondHeartAnimation = useRef(new Animated.Value(0)).current;
    const thirdHeartAnimation = useRef(new Animated.Value(0)).current;
    const fourthHeartAnimation = useRef(new Animated.Value(0)).current;
    const fifthHeartAnimation = useRef(new Animated.Value(0)).current;
    const sixthHeartAnimation = useRef(new Animated.Value(0)).current;
    const scale = useRef(new Animated.Value(0)).current;


    const getTransformationAnimation = (animation,scale,y,x,rotate,opacity) => {
        const scaleAnimation = animation.interpolate({
            inputRange:[0,1],
            outputRange:[0,scale]
        });
        const xAnimation = animation.interpolate({
            inputRange:[0,1],
            outputRange:[0,x]
        });
        const yAnimation = animation.interpolate({
            inputRange:[0,1],
            outputRange:[0,y]
        });
        const rotateAnimation = animation.interpolate({
            inputRange:[0,1],
            outputRange:["0deg",rotate]
        });
        const opaciyAnimation = animation.interpolate({
            inputRange:[0,1],
            outputRange:[0,opacity]
        });
        return {
            opacity:opaciyAnimation,
            transform:[
                {
                    scale:scaleAnimation
                },
                {
                    translateX:xAnimation
                },
                {
                    translateY:yAnimation
                },
                {
                    rotate:rotateAnimation
                }
            ]
        }
    }



    const bouncyHeart = scale.interpolate({
        inputRange:[0,1,2],
        outputRange:[1,.8,1]
    });

    const heartButtonStyles = {
        transform:[
            {
                scale:bouncyHeart
            }
        ]
    };


    const triggerLike = () => {
        setliked((lked) => !lked);
        let animations = [firstHeartAnimation,secondHeartAnimation,thirdHeartAnimation,fourthHeartAnimation,fifthHeartAnimation,sixthHeartAnimation];

            

            const startAnimations = animations.map(animation => {
                    return Animated.spring(animation,{
                        toValue:1,
                        friction:3,
                    useNativeDriver:true
                    })
                })

            const stopAnimations =  animations.map(animation => {
                   return Animated.timing(animation,{
                        toValue:0,
                        duration:500,
                    useNativeDriver:true
                    })
                })

                Animated.parallel([
                    Animated.spring(scale,{
                        toValue:2,
                        friction:3,
                        useNativeDriver:true
                    }),
                    Animated.sequence([
                        Animated.stagger(100,startAnimations),
            
                        Animated.delay(1500),
            
                        Animated.stagger(50,stopAnimations),
                    ])
                ]).start(() => {
                    setliked(false)
                    scale.setValue(0)
                })

    }

    return (
        <View style={styles.container}>
            <View>
             <HeartShape filled style={[styles.heart,getTransformationAnimation(firstHeartAnimation,.4,-280,0,"10deg",.7)]}/>
             <HeartShape filled style={[styles.heart,getTransformationAnimation(secondHeartAnimation,.7,-120,40,"45deg",.5)]}/>
             <HeartShape filled style={[styles.heart,getTransformationAnimation(thirdHeartAnimation,.8,-120,-40,"-45deg",.3)]}/>
             <HeartShape filled style={[styles.heart,getTransformationAnimation(fourthHeartAnimation,.3,-150,120,"-35deg",.6)]}/>
             <HeartShape filled style={[styles.heart,getTransformationAnimation(fifthHeartAnimation,.3,-120,-120,"-35deg",.7)]}/>
             <HeartShape filled style={[styles.heart,getTransformationAnimation(sixthHeartAnimation,.8,-60,0,"35deg",.8)]}/>
            <TouchableWithoutFeedback onPress={triggerLike}>
                <Animated.View style={heartButtonStyles}>
                    <HeartShape filled={liked}/>
                </Animated.View>
            </TouchableWithoutFeedback>
            </View>
        </View>
    )
}

export default HeartButton

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    },
    heart:{
        position:"absolute",
        top:0,
        left:0
    }
})
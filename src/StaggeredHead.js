import { Animated, Image, PanResponder, StyleSheet, Text, View } from 'react-native'
import React, { useRef, useState } from 'react';
import image from "./IMAGES/lion.jpg"

const StaggeredHead = () => {
    const staggeredimage = {uri:image}
    const headsarr = [
        {
            image :staggeredimage,
            animation:new Animated.ValueXY(),
            text:"Drag me"
        },
        {
            image :staggeredimage,
            animation:new Animated.ValueXY(),
        },
        {
            image :staggeredimage,
            animation:new Animated.ValueXY(),
        },
        {
            image :staggeredimage,
            animation:new Animated.ValueXY(),
        },
    ]
    const [heads,setheads] = useState(headsarr);

    const panresponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder:() => true,
            onMoveShouldSetPanResponder:() => true,
            onPanResponderGrant:(e,gestureState) => {
                heads.map(({animation}) => {
                    animation.extractOffset();
                    animation.setValue({x:0,y:0})
                })
            },
            onPanResponderMove:(e,{dx,dy}) => {
                heads[0].animation.setValue({
                    x:dx,
                    y:dy
                });
             const animations = heads.slice(1).map(({animation},index) => {
                return Animated.sequence([
                    Animated.delay(index * 10),
                    Animated.spring(animation,{
                        toValue:{x:dx,y:dy},
                        useNativeDriver:true
                    })
                ],{useNativeDriver:true}).start()
             });
            },
        })
    ).current
  return (
    <View style={styles.container}>
        {
            heads.slice(0).reverse().map((item,index,items) => {
                const pan = index === items.length - 1 ? panresponder.panHandlers : {};

                return (
                    <Animated.Image
                        {...pan}
                        key={index}
                        source={{uri:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3jqHo1seC0L_b9I7PyZInqUEQhelvETVM9C-_vUpS&s"}}
                        style={[styles.head,{
                            transform:item.animation.getTranslateTransform()
                        }]}
                    />
                )
            })
        }
    </View>
  )
}

const styles = StyleSheet.create({
    container:{flex:1,justifyContent:"center",alignItems:"center"},
    head:{width:80,height:80,borderRadius:40,position:"absolute",justifyContent:"center",alignItems:"center"}
})
export default StaggeredHead

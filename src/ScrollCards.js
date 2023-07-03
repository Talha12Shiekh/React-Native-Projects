import { StyleSheet, Text, View, FlatList,Image ,Animated,StatusBar,ScrollView} from 'react-native'
import React, { useRef } from 'react'


const ScrollCards = () => {
    const scrollY = useRef(new Animated.Value(0)).current
    const AVATAR_SIZE = 70;
    const SPACING = 20;
    const BACKGROUND_IMAGE = require("./IMAGES/flower.webp");
    const ITEM_SIZE = AVATAR_SIZE + SPACING * 3;
    const DATA = [
        {
          name: "Cameron Davis",
          email: "cameron.davis@example.com",
          picture: "https://randomuser.me/api/portraits/men/15.jpg",
          profession: "Web Developer"
        },
        {
          name: "Sofia Rodriguez",
          email: "sofia.rodriguez@example.com",
          picture: "https://randomuser.me/api/portraits/women/7.jpg",
          profession: "Graphic Designer"
        },
        {
          name: "Derek Thompson",
          email: "derek.thompson@example.com",
          picture: "https://randomuser.me/api/portraits/men/48.jpg",
          profession: "Software Engineer"
        },
        {
          name: "Avery Johnson",
          email: "avery.johnson@example.com",
          picture: "https://randomuser.me/api/portraits/women/83.jpg",
          profession: "Marketing Manager"
        },
        {
          name: "Nathan Wright",
          email: "nathan.wright@example.com",
          picture: "https://randomuser.me/api/portraits/men/32.jpg",
          profession: "Data Analyst"
        },
        {
          name: "Olivia Martinez",
          email: "olivia.martinez@example.com",
          picture: "https://randomuser.me/api/portraits/women/42.jpg",
          profession: "UX Designer"
        },
        {
          name: "Ethan Green",
          email: "ethan.green@example.com",
          picture: "https://randomuser.me/api/portraits/men/9.jpg",
          profession: "Front-end Developer"
        },
        {
          name: "Lila Hernandez",
          email: "lila.hernandez@example.com",
          picture: "https://randomuser.me/api/portraits/women/55.jpg",
          profession: "Content Writer"
        },
        {
          name: "Mason Evans",
          email: "mason.evans@example.com",
          picture: "https://randomuser.me/api/portraits/men/73.jpg",
          profession: "Product Manager"
        },
        {
          name: "Grace Lee",
          email: "grace.lee@example.com",
          picture: "https://randomuser.me/api/portraits/women/34.jpg",
          profession: "Business Analyst"
        },
        {
            name: "Hannah Baker",
            email: "hannah.baker@example.com",
            picture: "https://randomuser.me/api/portraits/women/19.jpg",
            profession: "Graphic Designer"
          },
          {
            name: "Maxwell Wilson",
            email: "maxwell.wilson@example.com",
            picture: "https://randomuser.me/api/portraits/men/29.jpg",
            profession: "Software Developer"
          },
          {
            name: "Lauren Garcia",
            email: "lauren.garcia@example.com",
            picture: "https://randomuser.me/api/portraits/women/60.jpg",
            profession: "Marketing Coordinator"
          }
          
        ];        
    return (
        <View style={{flex:1,backgroundColor:"#fff",}}>
            <StatusBar/>
            <Image source={BACKGROUND_IMAGE} style={StyleSheet.absoluteFillObject} blurRadius={20}/>
            <Animated.FlatList 
            data={DATA}
            onScroll={Animated.event(
                [{nativeEvent: {contentOffset: {y: scrollY}}}],{useNativeDriver:true}
              )}
            keyExtractor={item => item.key}
            contentContainerStyle={{padding:SPACING,paddingTop:StatusBar.currentHeight}}
            renderItem={({item,index}) => {
                const inputRange = [
                    -1,
                    0,
                    ITEM_SIZE * (index),
                    ITEM_SIZE * (index + 2),
                ]
                const OpacityinputRange = [
                    -1,
                    0,
                    ITEM_SIZE * (index),
                    ITEM_SIZE * (index + 1),
                ]
                
                const scale = scrollY.interpolate({
                    inputRange,
                    outputRange:[1,1,1,0]
                })
                const opacity = scrollY.interpolate({
                    inputRange :OpacityinputRange,
                    outputRange:[1,1,1,0]
                })
                return <Animated.View style={{flexDirection:"row",padding:SPACING,
                shadowColor:"#000",
                shadowOpacity:2,
                shadowOffset:{
                    width:0,
                    height:10
                },
                elevation:9,
                marginBottom:SPACING,backgroundColor:"rgba(255,255,255,0.9)",borderRadius:12,opacity,
                transform:[
                    {scale}
                ]
                }} >
                    <Image source={{uri:item.picture}} style={{
                        height:AVATAR_SIZE,
                        width:AVATAR_SIZE,
                        borderRadius:AVATAR_SIZE,
                        marginRight:SPACING/2
                    }}/>
                    <View>
                        <Text style={{fontSize:22,fontWeight:"700"}}>{item.name.toUpperCase()}</Text>
                        <Text style={{fontSize:15,opacity:.7}}>{item.email}</Text>
                        <Text style={{fontSize:14,opacity:.8,color:"#0099cc"}}>{item.profession}</Text>
                    </View>
                </Animated.View>
            }}
            />
        </View>
    )
}

export default ScrollCards

const styles = StyleSheet.create({})
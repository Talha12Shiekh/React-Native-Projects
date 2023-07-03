import { Animated, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, useWindowDimensions, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'

const SuccessMessage = () => {
    const animate = useRef(new Animated.Value(0)).current;

    const [success, setsuccess] = useState(false);

    const inputRef = useRef(null);

    function handlePress(){
        inputRef.current.focus()
        Animated.timing(animate,{
            toValue:1,
            duration:300,
            useNativeDriver:true
        }).start()
    }
    function handleSend(){
        inputRef.current.blur()
        setsuccess(true);  
    }
    
    useEffect(() => {
        Animated.sequence([
            Animated.timing(animate,{
                toValue:0,
                duration:300,
                useNativeDriver:true
            }),
            Animated.delay(1500)
        ]).start(() => {
            setsuccess(false)
        })
    }, [success])
    

    const widthInterpolate = animate.interpolate({
        inputRange:[0,.5,1],
        outputRange:[1,1,1.3],
        extrapolate:"clamp"
    });

    const inputScaleInterpolate = animate.interpolate({
        inputRange:[0,.5,.6],
        outputRange:[0,0,1],
        extrapolate:"clamp"
    });

    const sendButtonInterpolate = animate.interpolate({
        inputRange:[0,.6,1],
        outputRange:[0,0,1]
    });

    const notifyTextScaleInterpolate = animate.interpolate({
        inputRange:[0,.5],
        outputRange:[1,0],
        extrapolate:"clamp"
    })

    const notifyTextScaleStyles = {
        transform:[
            {scale:notifyTextScaleInterpolate}
        ]
    }

    const sendButtonStyles = {
        transform:[
            {scale:sendButtonInterpolate}
        ]
    }

    const inputScaleStyles = {
        transform:[
            {scale:inputScaleInterpolate}
        ]
    }

    const buttonWrapStyles = {
        transform:[
            {scaleX:widthInterpolate}
        ]
    }

    const thankYouScaleInterpolate = animate.interpolate({
        inputRange:[0,1],
        outputRange:[1,0]
    });

    const thankYouTxtStyles = {
        transform:[
            {scale:thankYouScaleInterpolate}
        ]
    }

    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={handlePress}>
                <Animated.View style={[styles.buttonWrap,buttonWrapStyles]}>
                   {!success && <Animated.View style={[StyleSheet.absoluteFill,inputScaleStyles]}>
                        <TextInput
                        ref={inputRef}
                            keyboardType="email-address"
                            placeholder='Email'
                            placeholderTextColor="rgba(255,123,115,0.8)"
                            style={[styles.textInput]}
                        />
                        <TouchableOpacity style={[styles.sendButton,sendButtonStyles]}
                        onPress={handleSend}
                        >
                            <Text style={styles.sendText}>Send</Text>
                        </TouchableOpacity>
                    </Animated.View>}

                    {!success && <Animated.View style={[styles.nothing,notifyTextScaleStyles]}>
                        <Text style={styles.notifyText}>Notify me</Text>
                    </Animated.View>}

                    {success && <Animated.View style={thankYouTxtStyles}>
                        <Text style={styles.notifyText}>Thank You</Text>
                    </Animated.View>}
                </Animated.View>
            </TouchableWithoutFeedback>
        </View>
    )
}

export default SuccessMessage

const styles = StyleSheet.create({
    container:{ flex:1 , justifyContent:"center", alignItems:"center" ,backgroundColor:"orange" },
    notifyText:{backgroundColor:"white",padding:20,textAlign:"center",borderRadius:50,color:"black",paddingHorizontal:40 },
    textInput:{ backgroundColor:"white",padding:10, borderRadius:50},
    sendButton: { backgroundColor:'orange',marginRight:5,padding:5,paddingHorizontal:15,marginTop:5,borderRadius:10}
})
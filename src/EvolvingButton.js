import { Animated, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, useWindowDimensions, View } from 'react-native'
import React, { useRef, useState } from 'react';
// * importing icons
import Icon from "react-native-vector-icons/MaterialCommunityIcons"

const EvolvingButton = () => {

    const [open,setopen] = useState(false);

    const animation = useRef(new Animated.Value(0)).current;

    const { width } = useWindowDimensions();

    const inputRef = useRef(null);

    const widthInterpolate = animation.interpolate({
        inputRange:[0,.5],
        outputRange:[100,width - 40],
        extrapolate:"clamp"
    });

    const opacityToolBarInterpolate = animation.interpolate({
        inputRange:[0,.5],
        outputRange:[0,1],
        extrapolate:"clamp"
    });

    const toolBarStyles = {
        opacity:opacityToolBarInterpolate
    }

    const editorHeigthInterpolate = animation.interpolate({
        inputRange:[.7,1],
        outputRange:[0,150],
        extrapolate:"clamp"
    });

    const editorStyles = {
        opacity:animation,
        height:editorHeigthInterpolate
    };

    const opacityButtonInterpolate = animation.interpolate({
        inputRange:[0,.5],
        outputRange:[1,0],
        extrapolate:"clamp"
    });

    const Buttonstyles  = {
        opacity:opacityButtonInterpolate
    };

    function handleToggle(){
        const toValue = open ? 0 : 1;
        Animated.timing(animation,{
            toValue,
            duration:1000,
        }).start(() => {
            open ? inputRef.current.blur() : inputRef.current.focus(); 
            setopen(!open);
        })
    }
    return (
        <View style={styles.container}>
            <KeyboardAvoidingView style={styles.center} behavior='padding'>
                <Animated.View style={[styles.editor, { width: widthInterpolate}]}>
                    <View style={styles.bar}>
                        <Animated.View style={[styles.toolbar,toolBarStyles]}>
                            <Icon name="format-bold" color="#FFF" size={20} />
                            <Icon name="format-italic" color="#FFF" size={20} />
                            <Icon name="format-underline" color="#FFF" size={20} />
                            <Icon name="format-list-bulleted" color="#FFF" size={20} />
                            <Icon name="format-list-bulleted" color="#FFF" size={20} />
                            <View style={styles.rightInnerBar}>
                                <Icon name="link" color="#FFF" size={20} />
                                <Icon name="image" color="#FFF" size={20} />
                                <Icon name="arrow-down-bold-box" color="#FFF" size={20} />
                            </View>
                        </Animated.View>

                        <Animated.View style={[StyleSheet.absoluteFill, styles.center,Buttonstyles]} pointerEvents={open ? "none" : "auto"}>
                            <TouchableOpacity onPress={handleToggle} >
                                <View>
                                    <Text style={styles.buttonText}>Write</Text>
                                </View>
                            </TouchableOpacity>
                        </Animated.View>
                    </View>
                    <Animated.View style={[styles.lowerView,editorStyles]}>
                        <TextInput
                            placeholder='Start Writing...'
                            multiline
                            ref={inputRef}
                            style={[StyleSheet.absoluteFill, styles.input]}
                        />
                    </Animated.View>
                </Animated.View>
                <TouchableOpacity onPress={handleToggle}>
                    <Animated.View style={toolBarStyles}>
                        <Text style={styles.close}>Close</Text>
                    </Animated.View>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </View>
    )
}

export default EvolvingButton

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", alignItems: "center" },
    center: { alignItems: "center", justifyContent: "center" },
    editor: { borderWith: 1, borderColor: "rgba(0,0,0,.1)" },
    bar: { height: 50, backgroundColor: "#2979FF", justifyContent: "center" },
    toolbar: { flexDirection: "row", paddingHorizontal: 10, alignItems: "center", justifyContent: "flex-start" },
    rightInnerBar: { flexDirection: "row", alignItems: "center", justifyContent: "flex-end", flex: 1 },
    lowerView: { height: 250, borderColor: "grey", borderWidth: 1 },
    input: { padding: 10, fontSize: 20, textAlignVertical: 'top' },
    buttonText:{ color:"white" },
    close:{ color:"#2979FF" , marginTop:10,marginBottom:20 }
})
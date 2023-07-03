import { Animated, StyleSheet, Text, useWindowDimensions, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { TouchableOpacity } from 'react-native';

const Questionarre = () => {
    const [index,setindex] = useState(0);
    const questions = [
        "Do you tend to follow directions when given?",
        "Are you comfortable with the idea of standing and doing light physical activity most of the day?",
        "Would you enjoy making sure your customers leave happy?",
        "Are you willing to work nights and weekends (and possibly holidays)?",
    ];
    const animation = useRef(new Animated.Value(0)).current;
    const progress = useRef(new Animated.Value(0)).current;
    function handleAnswer() {
        Animated.parallel([
            Animated.timing(progress,{
                toValue:index + 1,
                duration:500
            }),
            Animated.timing(animation,{
                toValue:1,
                duration:500,
                useNativeDriver:true
            })
        ]).start(() => {
           setindex((ind) => ind + 1);
           animation.setValue(0)
        })
    }
    const question = questions[index];
    let nextQuestion;

    if(index + 1 < questions.length){
        nextQuestion = questions[index + 1]
    }
    const {width} = useWindowDimensions();

    const currentTextinterpolate = animation.interpolate({
        inputRange:[0,1],
        outputRange:[0,-width]
    })
    const progressInterpolate = progress.interpolate({
        inputRange:[0,questions.length],
        outputRange:["0%","100%"]
    });
    const progressStyles = {
        width:progressInterpolate
    }
    const nextTextinterpolate = animation.interpolate({
        inputRange:[0,1],
        outputRange:[width,0]
    });
    const currentTextStyles = {transform:[{translateX:currentTextinterpolate}]}
    const nextTextStyles = {transform:[{translateX:nextTextinterpolate}]}

    return (
        <View style={styles.container}>
            <View style={[StyleSheet.absoluteFill,styles.overlay]}>
                <Animated.Text style={[styles.questionText,currentTextStyles]}>{question}</Animated.Text>
                <Animated.Text style={[styles.questionText,nextTextStyles]}>{nextQuestion}</Animated.Text>
            </View>
            <View style={styles.progress}>
                <Animated.View style={[styles.progressBar,progressStyles]}/>
            </View>
            <TouchableOpacity
                onPress={handleAnswer}
                style={styles.option}
                activeOpacity={0.7}
            >
                <Text style={styles.optionText}>No</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={handleAnswer}
                style={[styles.option, styles.yes]}
                activeOpacity={0.7}
            >
                <Text style={styles.optionText}>Yes</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Questionarre

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#E22D4B",
        flexDirection: "row",
    },
    option: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    progress:{
        position:"absolute",
        left:0,
        bottom:0,
        right:0,
        height:10
    },
    progressBar:{
        height:"100%",
        backgroundColor:"#fff"
    },
    yes: {
        backgroundColor: "rgba(255,255,255,.1)",
    },
    optionText: {
        fontSize: 30,
        color: "#FFF",
        marginBottom: 50,
    },
    overlay:{
        alignItems:"center",
        justifyContent:"center"
    },
    questionText:{
        backgroundColor:"transparent",
        position:'absolute',
        fontSize:30,
        color:"#fff",
        textAlign:"center"
    }
});
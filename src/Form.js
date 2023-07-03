import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Animated,
  KeyboardAvoidingView,
} from "react-native";
import React, { useEffect, useRef } from 'react'

const Form = () => {

  function animatedTextfields(animation) {
    const animate = animation.interpolate({
      inputRange:[0,1],
      outputRange:[-5,0]
    })
    return {
      opacity:animation,
      transform:[{
        translateY:animate
      }]
    }
  }

  const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);
  const inputref = useRef(null);

  const email = useRef(new Animated.Value(0)).current;
  const password = useRef(new Animated.Value(0)).current;
  const button = useRef(new Animated.Value(0)).current;

  const emailStyles = animatedTextfields(email);
  const passwordStyles = animatedTextfields(password);
  const buttonStyles = animatedTextfields(button);

  useEffect(() => {
    Animated.stagger(300,[
      Animated.timing(email,{
        toValue:1,
        duration:600,
      }),
      Animated.timing(password,{
        toValue:1,
        duration:600,
      }),
      Animated.timing(button,{
        toValue:1,
        duration:600,
      }),
    ]).start(({finished}) => {
      if(finished){
        inputref.current.focus()
      }
    })
  },[])
  return (
    <View style={styles.container}>
      <Image
        source={require("./IMAGES/lion.jpg")}
        resizeMode="cover"
        style={[StyleSheet.absoluteFill, { width: null, height: null }]}
      >
      </Image>
      <View style={styles.container} />
      <KeyboardAvoidingView style={styles.form} behavior="padding">
        <View style={styles.container}>
          <Text style={styles.title}>Login</Text>
          <AnimatedTextInput
            ref={inputref}
            style={[styles.input,emailStyles]}
            placeholder="Email"
            keyboardType="email-address"
          />
          <AnimatedTextInput
            placeholder="Password"
            style={[styles.input,passwordStyles]}
            secureTextEntry
          />
           <TouchableOpacity>
      <Animated.View style={[styles.button,buttonStyles]}>
        <Text style={styles.buttonText}>Login</Text>
      </Animated.View>
    </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      <View style={styles.container} />
    </View>
  )
}

export default Form

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 30,
    color: "#FFF",
    backgroundColor: "transparent",
    textAlign: "center",
    marginBottom: 10,
  },
  form: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,.25)",
    paddingVertical: 10,
  },
  input: {
    width: 250,
    height: 35,
    paddingHorizontal: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#FFF",
    color: "#333",
    backgroundColor: "#FFF",
  },
  button: {
    marginTop: 10,
    backgroundColor: "tomato",
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 5,
  },
  buttonText: {
    textAlign: "center",
    color: "#FFF",
    fontSize: 16,
  },
});
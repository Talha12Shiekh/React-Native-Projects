import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react';
import Icon from "react-native-vector-icons/Foundation";
import { Animated, TextInput } from "react-native";

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);
//  creating an animated Text input

const AnimatedIcon = Animated.createAnimatedComponent(Icon);
//  creating an animated Icon

const ColorPicker = () => {
  const animation = useRef(new Animated.Value(0)).current;
  const Buttonanimation = useRef(new Animated.Value(0)).current;
  const [open, setopen] = useState(false);
  const [Inputopen, setInputopen] = useState(false);
  const inputRef = useRef(null);
  const [color, setcolor] = useState("black");
  function handleToggle() {
    const toValue = open ? 0 : 1;
    Animated.spring(animation, {
      toValue,
      useNativeDriver: true
    }).start()
    setopen(!open)
  }
  function ToggleInput() {
    const toValue = Inputopen ? 0 : 1;
    Animated.spring(Buttonanimation, {
      toValue,
      useNativeDriver: true,
      duration: 250
    }).start()
    setInputopen(!Inputopen)
  }

  useEffect(() => {
    if (!Inputopen) {
      inputRef.current.blur()
    } else {
      inputRef.current.focus()
    }
  }, [Inputopen])

  const colorStyle = {
    backgroundColor: color
  }
  const scaleXinterpolate = animation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 0, 1]
  })
  const translateYInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [150, 1]
  })
  const moveInterpolate = Buttonanimation.interpolate({
    inputRange: [0, 1],
    outputRange: [-150, 1]
  });
  const buttonStyles = {
    transform: [
      {
        translateX: moveInterpolate
      },
      { scale: Buttonanimation }
    ]
  }
  const inputOpacityInterpolate = Buttonanimation.interpolate({
    inputRange: [0, .8, 1],
    outputRange: [0, 0, 1]
  });
  const iconsTranslate = Buttonanimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -20]
  })
  const iconsOpacity = Buttonanimation.interpolate({
    inputRange: [0, .2],
    outputRange: [1, 0]
  });
  const iconsStyles = {
    transform: [{ translateY: iconsTranslate }],
    opacity: iconsOpacity
  }
  const inputStyles = { opacity: inputOpacityInterpolate }
  const rowStyle = {
    opacity: animation,
    transform: [{ scaleY: animation }, { scaleX: scaleXinterpolate }, { translateY: translateYInterpolate }]
  }
  return (
    <View style={styles.container}>
      <Animated.View style={[styles.rowWrap, rowStyle]}>
        <TouchableOpacity onPress={ToggleInput}>
          <Animated.View style={[styles.colorBall, colorStyle]} />
        </TouchableOpacity>
        <View style={styles.row}>
          <TouchableOpacity>
            <AnimatedIcon name="bold" size={30} color="#555" style={iconsStyles} />
          </TouchableOpacity>
          <TouchableOpacity>
            <AnimatedIcon name="italic" size={30} color="#555" style={iconsStyles} />
          </TouchableOpacity>
          <TouchableOpacity>
            <AnimatedIcon name="align-center" size={30} color="#555" style={iconsStyles} />
          </TouchableOpacity>
          <TouchableOpacity>
            <AnimatedIcon name="link" size={30} color="#555" style={iconsStyles} />
          </TouchableOpacity>
          <Animated.View style={[StyleSheet.absoluteFill, styles.colorRowWrap]} pointerEvents={Inputopen ? "auto" : "none"}>
            <AnimatedTextInput
              style={[styles.input, inputStyles]}
              value={color}
              onChangeText={(color) => setcolor(color)}
              ref={inputRef}
              autoCapitalize='none'
            />
            <TouchableOpacity onPress={ToggleInput}>
              <Animated.View style={[styles.okayButton, buttonStyles]}>
                <Text style={styles.okayText}>OK</Text>
              </Animated.View>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Animated.View>
      <TouchableOpacity onPress={handleToggle} style={styles.button}>
        <Text>Toggle Open / Closed</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ColorPicker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    marginTop: 50,
  },
  rowWrap: {
    flexDirection: "row",
    alignItems: "center",
    minWidth: "50%",
    backgroundColor: "#FFF",
    borderRadius: 20,
    shadowColor: "#333",
    shadowOpacity: 0.2,
    shadowOffset: { x: 2, y: 2 },
    shadowRadius: 3,
    paddingVertical: 5,
    paddingHorizontal: 10,
    elevation: 10
  },
  colorBall: {
    width: 15,
    height: 15,
    borderRadius: 8,
  },
  row: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
    overflow: "hidden",
  },
  colorRowWrap: {
    flexDirection: "row",
    flex: 1,
    paddingLeft: 5,
  },
  input: {
    flex: 1,
  },
  okayButton: {
    borderRadius: 20,
    height: "100%",
    width: 40,
    backgroundColor: "#309EEB",
    alignItems: "center",
    justifyContent: "center",
  },
  okayText: {
    color: "#FFF",
  },
});



import {
  Animated,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const FloatingButton = () => {
  const animation = useRef(new Animated.Value(0)).current;
  const [open, setopen] = useState(false);
  const reloadStyle = {
    transform: [
      {
        scale: animation,
      },
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -70],
          extrapolate: "clamp",
        }),
      },
    ],
  };

  const orderStyle = {
    transform: [
      {
        scale: animation,
      },
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -140],
          extrapolate: "clamp",
        }),
      },
    ],
  };

  const bgStyle = {
    transform: [
      {
        scale: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 30],
        }),
      },
    ],
  };

  const labelPositionInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [-30, -120],
  });
  const opacityInterpolate = animation.interpolate({
    inputRange: [0, 0.8, 1],
    outputRange: [0, 0, 1],
  });

  const labelStyle = {
    opacity: opacityInterpolate,
    transform: [{ translateX: labelPositionInterpolate }],
  };

  function ToggleOpen() {
    const toValue = open ? 0 : 1;
    Animated.timing(animation, {
      toValue,
      duration: 500,
      useNativeDriver: true,
    }).start();
    setopen(!open);
  }

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.background, bgStyle]} />
      <TouchableWithoutFeedback>
        <Animated.View style={[styles.button, styles.other, orderStyle]}>
          <Animated.Text style={[styles.label, labelStyle]}>
            Order
          </Animated.Text>
          <Icon name="reload" size={20} color="#555" />
        </Animated.View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback>
        <Animated.View style={[styles.button, styles.other, reloadStyle]}>
          <Animated.Text style={[styles.label, labelStyle]}>
            Reload
          </Animated.Text>
          <Icon name="food-fork-drink" size={20} color="#555" />
        </Animated.View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={ToggleOpen}>
        <View style={[styles.button, styles.pay]}>
          <Animated.Text style={[styles.label, labelStyle]}>Pay</Animated.Text>
          <Text style={styles.payText}>$5.00</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default FloatingButton;

const styles = StyleSheet.create({
  container: { flex: 1 },
  button: {
    height: 60,
    width: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    bottom: 30,
    right: 20,
    shadowColor: "#333",
    shadowOpacity: 0.1,
    shadowOffset: { x: 2, y: 0 },
    shadowRadius: 2,
    borderRadius: 30,
    elevation: 20,
    position: "absolute",
  },
  pay: { backgroundColor: "#00B15E" },
  payText: { color: "white" },
  other: { backgroundColor: "white" },
  label: {
    color: "white",
    position: "absolute",
    fontSize: 15,
    backgroundColor: "transparent",
  },
  background: {
    backgroundColor: "rgba(0,0,0,.2)",
    height: 60,
    width: 60,
    bottom: 30,
    right: 20,
    position: "absolute",
    borderRadius: 30,
  },
});

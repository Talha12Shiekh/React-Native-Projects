import React, { useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  PanResponder,
  TouchableOpacity,
} from "react-native";

import clamp from "clamp";

const KittenCards = () => {
  const Cat1 = { uri: "http://i.imgur.com/W4qnVsw.jpg" };
  const Cat2 = { uri: "http://i.imgur.com/4WVHep7.jpg" };
  const Cat3 = { uri: "http://i.imgur.com/rxvWa3V.jpg" };
  const Cat4 = { uri: "http://i.imgur.com/V2DHGcN.jpg" };
  const renderitems = [
    {
      image: Cat1,
      id: 1,
      text: "Sweet Cat",
    },
    {
      image: Cat2,
      id: 2,
      text: "Sweeter Cat",
    },
    {
      image: Cat3,
      id: 3,
      text: "Sweetest Cat",
    },
    {
      image: Cat4,
      id: 4,
      text: "Aww",
    },
  ];

  const [items, setitems] = useState(renderitems);

  const animation = useRef(new Animated.ValueXY()).current;
  const opacity = useRef(new Animated.Value(1)).current;
  const next = useRef(new Animated.Value(0.9)).current;

  function transitionNext() {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false
      }),
      Animated.spring(next, {
        toValue: 1,
        friction: 5,
        useNativeDriver: false
      })
    ]).start(() => {
      setitems((stateitems) => stateitems.slice(1));
      animation.setValue({ x: 0, y: 0 });
      opacity.setValue(1);
      next.setValue(0.9)
    })
  };

  function handleNo() {
    Animated.timing(animation.x, {
      toValue: -SWIPE_THRESHOLD,
      useNativeDriver: false
    }).start(transitionNext)
  }
  function handleYes() {
    Animated.timing(animation.x, {
      toValue: SWIPE_THRESHOLD,
      useNativeDriver: false
    }).start(transitionNext)
  }

  const panresponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event([
      null,
      {
        dx: animation.x,
        dy: animation.y,
      },
    ], { useNativeDriver: false }),
    onPanResponderRelease: (e, { dx, vx, vy }) => {
      let velocity;
      if (vx >= 0) {
        velocity = clamp(vx, 3, 5);
      } else if (vx < 0) {
        velocity = clamp(Math.abs(vx), 3, 5) * -1;
      }

      if (Math.abs(dx) > SWIPE_THRESHOLD) {
        Animated.decay(animation, {
          velocity: { x: velocity, y: vy },
          deceleration: 0.9,
          useNativeDriver: false
        }).start(transitionNext)
      } else {
        Animated.spring(animation, {
          toValue: { x: 0, y: 0 },
          friction: 4,
          useNativeDriver: false
        }).start()
      }
    }
  })


  const SWIPE_THRESHOLD = 120;

  const rotate = animation.x.interpolate({
    inputRange: [-200, 0, 200],
    outputRange: ["30deg", "0deg", "30deg"],
    extrapolate: "clamp"
  });
  const opacityAnimation = animation.x.interpolate({
    inputRange: [-200, 0, 200],
    outputRange: [.5, 1, .5],
    extrapolate: "clamp"
  });
  const cardAnimatedStyles = {
    opacity,
    transform: [
      {
        rotate,
      },
      ...animation.getTranslateTransform()
    ]
  };
  // for right side movement
  const yesOpacity = animation.x.interpolate({
    inputRange: [0, 150],
    outputRange: [0, 1]
  });
  const yesScale = animation.x.interpolate({
    inputRange: [0, 150],
    outputRange: [0.5, 1],
    extrapolate: "clamp"
  });
  const animatedyupStyles = {
    transform: [
      { rotate: "-30deg" },
      { scale: yesScale }
    ],
    opacity: yesOpacity
  }
  // for left side movement
  const nopOpacity = animation.x.interpolate({
    inputRange: [-150, 0],
    outputRange: [1, 0]
  });
  const noScale = animation.x.interpolate({
    inputRange: [-150, 0],
    outputRange: [1, 0.5],
    extrapolate: "clamp"
  });
  const animatednopStyles = {
    transform: [
      { rotate: "-30deg" },
      { scale: noScale }
    ],
    opacity: nopOpacity
  }

  const animatedImageStyles = { opacityAnimation }
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        {
          items.slice(0, 2).reverse().map(({ image, id, text }, index, items) => {
            const isLastItem = index === items.length - 1;
            const isSecondlastItem = index === items.length - 2;
            const panHandlers = isLastItem ? panresponder.panHandlers : {};
            const cardStyles = isLastItem ? cardAnimatedStyles : undefined;
            const ImageStyles = isLastItem ? animatedImageStyles : undefined;
            const scaleStyles = isSecondlastItem ? {
              transform: [{ scale: next }]
            } : undefined;
            return (
              <Animated.View key={id} style={[styles.card, cardStyles, scaleStyles]}
                {...panHandlers}
              >
                <Animated.Image source={image} resizeMode="cover" style={[styles.image, ImageStyles]} />
                <View style={[styles.lowerText]}>
                  <Text style={{ textAlign: "center", marginTop: 5, fontSize: 40 }}>{text}</Text>
                </View>

                {isLastItem && <Animated.View style={[styles.nope, animatednopStyles]}>
                  <Text style={styles.nopeText}>Nope!</Text>
                </Animated.View>}

                {isLastItem && <Animated.View style={[styles.yup, animatedyupStyles]}>
                  <Text style={styles.yupText}>Yup!</Text>
                </Animated.View>}
              </Animated.View>
            )
          })
        }
      </View>
      <View style={styles.buttonBar}>
        <TouchableOpacity
          onPress={handleNo}
          style={[styles.button, styles.nopeButton]}
        >
          <Text style={styles.nopeText}>NO</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleYes}
          style={[styles.button, styles.yupButton]}
        >
          <Text style={styles.yupText}>YES</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  top: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonBar: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10
  },
  card: {
    width: 300,
    height: 300,
    position: "absolute",
    borderRadius: 3,
    padding: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.20,
    shadowRadius: 3.65,

    elevation: 8,
  },
  image: {
    width: null,
    height: null,
    flex: 3,
    borderRadius: 2
  },
  lowerText: {
    flex: 1,
    backgroundColor: "white",
    textAlign: "center"
  },
  buttonBar: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
  button: {
    marginHorizontal: 10,
    padding: 20,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    shadowOpacity: 0.3,
    shadowOffset: { x: 0, y: 0 },
    shadowRadius: 5,
  },
  yupButton: {
    borderWidth:3,
    borderColor:"green"
  },
  nopeButton: {
    borderWidth:3,
    borderColor:"red"
  },
  yup: {
    borderColor: "green",
    borderWidth: 2,
    position: "absolute",
    padding: 20,
    borderRadius: 5,
    top: 20,
    left: 20,
    backgroundColor: "#FFF",
  },
  yupText: {
    fontSize: 16,
    color: "green",
  },
  nope: {
    borderColor: "red",
    borderWidth: 2,
    position: "absolute",
    padding: 20,
    borderRadius: 5,
    right: 20,
    top: 20,
    backgroundColor: "#FFF",
  },
  nopeText: {
    fontSize: 16,
    color: "red",
  },
});

export default KittenCards;
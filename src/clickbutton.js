import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Animated,
  Easing,
} from 'react-native';
import { Audio } from 'expo-av';

export default function App() {
  const [sound,setsound] = React.useState();

  const buttonAnimation = React.useRef(new Animated.Value(0)).current;

  const buttonStyles = {
    transform:[
      {
        scale:buttonAnimation.interpolate({
          inputRange:[0,1,2],
          outputRange:[1,.8,1]
        })
      }
    ]
  }

  const playSound = async () => {
    Animated.spring(buttonAnimation,{
      toValue:2,
      friction:3
    }).start(() => {
      buttonAnimation.setValue(0)
    })
    const {sound} = await Audio.Sound.createAsync(require("./assets/click.mp3"));
    setsound(sound);
    await sound.playAsync()
  }

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={playSound}>
        <Animated.View style={[styles.buttonView,buttonStyles]}>
          <Text style={styles.buttonText}>Click</Text>
        </Animated.View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 10,
    alignItems: 'center',
  },
  buttonView: {
    width: 180,
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
    borderRadius: 100,
  },
  buttonText: {
    color: 'white',
    fontSize: 30,
    letterSpacing: 3,
  },
});

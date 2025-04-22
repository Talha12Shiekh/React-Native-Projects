import React from 'react';
import {Button, View} from 'react-native';
import Animated, {
  LayoutAnimationConfig,
  PinwheelIn,
  PinwheelOut,
} from 'react-native-reanimated';

export default function Layout() {
  const [show, setShow] = React.useState(true);

  return (
    <LayoutAnimationConfig skipEntering>
      <View>
        {show && (
          <Animated.View
            style={{width: 100, height: 100, backgroundColor: 'red'}}
            entering={PinwheelIn}
            exiting={PinwheelOut}
          />
        )}
      </View>

      <Button title="Animate" onPress={() => setShow(p => !p)} />
    </LayoutAnimationConfig>
  );
}

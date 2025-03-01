import {StyleSheet, View, LogBox, AppState, ToastAndroid} from 'react-native';
import React, {useEffect, useState} from 'react';
import {BG_COLOR} from './Constants';
import TimerComponent from './Components/TimerComponent';
import ButtonsComponent from './Components/ButtonsComponent';

LogBox.ignoreLogs(['new NativeEventEmitter']);
LogBox.ignoreAllLogs();

const App = () => {
  const [timers, setimers] = useState({
    miliscnds: 0,
    scnds: 0,
    minutes: 0,
    hours: 0,
  });

  const [timerStatus, settimerStatus] = useState('Start');


  const [appState, setAppState] = useState(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (nextAppState === 'background') {
            ToastAndroid.show('Timer is running in the background',ToastAndroid.LONG);
      }
      setAppState(nextAppState);
    });

    // Cleanup subscription on unmount
    return () => {
      subscription.remove();
    };
  }, [appState]);

  return (
    <View style={styles.container}>
      <TimerComponent timers={timers} />
      <ButtonsComponent timerStatus={timerStatus} settimerStatus={settimerStatus} timers={timers} setimers={setimers} />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR,
  },
});

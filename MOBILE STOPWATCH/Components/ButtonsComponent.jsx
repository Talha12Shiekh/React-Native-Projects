import {StyleSheet, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import SingleButton from './SingleButton';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {
  BLUE_BTN_BG,
  GREY_COLOR,
  LIGHT_BLUE_BTN_BG,
  RED_COLOR,
} from '../Constants';
import BackgroundTimer from 'react-native-background-timer';

const ButtonsComponent = ({setimers, timers,timerStatus,settimerStatus}) => {
  const timerRef = useRef(null);

  const TIMER_SPEED = 50;

  useEffect(() => {
    if (timers.miliscnds >= 100) {
      setimers(prev => {
        return {
          ...prev,
          miliscnds: prev.miliscnds - 100,
          scnds: prev.scnds + 1, // Increment seconds
        };
      });
    }

    if (timers.scnds >= 60) {
      setimers(prev => {
        return {
          ...prev,
          scnds: prev.scnds - 60,
          minutes: prev.minutes + 1, // Increment minutes
        };
      });
    }

    if (timers.minutes >= 60) {
      setimers(prev => {
        return {
          ...prev,
          minutes: prev.minutes - 60,
          hours: prev.hours + 1, // Increment hours
        };
      });
    }

    if (
      timers.hours === 99 &&
      timers.minutes === 59 &&
      timers.scnds === 59 &&
      timers.miliscnds === 99
    ) {
      resetTimer();
      settimerStatus('');
    }
  }, [timers, setimers]); // Dependency array includes timers and setimers

  function toggleTimerStatus() {
    switch (timerStatus) {
      case 'Start':
        settimerStatus('Stop');
        break;
      case 'Stop':
        settimerStatus('Resume');
        break;
      case 'Resume':
        settimerStatus('Stop');
        break;
      case '':
        settimerStatus('');
        break;

      default:
        settimerStatus('Start');
        break;
    }
  }

  function handleStartTimer() {
    if (timerRef.current !== null) return;
    timerRef.current = BackgroundTimer.setInterval(() => {
      setimers(prev => {
        return {
          ...prev,
          miliscnds: prev.miliscnds + 1,
        };
      });
    }, TIMER_SPEED);
    toggleTimerStatus();
  }

 

  function resetTimer() {
    if (timerRef.current !== null) {
      BackgroundTimer.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }

  function handleStopTimer() {
    resetTimer();
    toggleTimerStatus();
  }

  function handleResetTimer() {
    setimers({
      miliscnds: 0,
      scnds: 0,
      minutes: 0,
      hours: 0,
    });
    resetTimer();
    settimerStatus('Start');
  }

  function RenderButton() {
    switch (timerStatus) {
      case 'Start': {
        return (
          <SingleButton
            onPress={handleStartTimer}
            text={'Start'}
            bgcolor={BLUE_BTN_BG}
          />
        );
      }
      case 'Stop': {
        return (
          <SingleButton
            onPress={handleStopTimer}
            text="Stop"
            bgcolor={RED_COLOR}
          />
        );
      }
      case 'Resume': {
        return (
          <SingleButton
            onPress={handleStartTimer}
            text="Resume"
            bgcolor={LIGHT_BLUE_BTN_BG}
          />
        );
      }
      case '': {
        return null;
      }
    }
  }

  return (
    <View
      style={[
        styles.container,
        {justifyContent: timerStatus === '' ? 'flex-end' : 'space-between'},
      ]}>
      <SingleButton
        onPress={handleResetTimer}
        disabled={timerStatus !== 'Resume' && timerStatus !== ''}
        text="Reset"
        fullWidth={timerStatus === ''}
        bgcolor={GREY_COLOR}
      />
      {RenderButton()}
    </View>
  );
};

export default ButtonsComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: wp(12),
    paddingBottom: wp(10),
  },
});

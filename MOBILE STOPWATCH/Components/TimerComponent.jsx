import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {formatText, WHITE_COLOR} from '../Constants';

const TimerComponent = ({timers}) => {
  const {miliscnds, scnds, minutes, hours} = timers;
  const showingHoursCondition = hours > 0;

  const ShowingHoursComponent = () => (
    <TimerTextContainer>
      {showingHoursCondition && `${formatText(hours, 'hours')} : `}
    </TimerTextContainer>
  );

  const TimerTextContainer = ({children}) => (
    <View
      style={[
        styles.timerTextContainer,
        {width: showingHoursCondition ? wp(23) : wp(28)},
      ]}>
      <Text
        style={[styles.timer, {fontSize: wp(showingHoursCondition ? 11 : 14)}]}>
        {children}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {showingHoursCondition && <ShowingHoursComponent />}
      <TimerTextContainer>
        {formatText(minutes, 'minutes')} :{' '}
      </TimerTextContainer>
      <TimerTextContainer>{formatText(scnds, 'seconds')} .</TimerTextContainer>
      <TimerTextContainer>
        {formatText(miliscnds, 'miliseconds')}
      </TimerTextContainer>
    </View>
  );
};

export default TimerComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  timer: {
    color: WHITE_COLOR,
    fontFamily: 'Poppins-Thin',
    textAlign: 'center',
  },
  timerTextContainer: {
    width: wp(28), // Adjust width to keep each segment aligned; tweak as needed
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
});

import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {center, WHITE_COLOR} from '../Constants';

const SingleButton = ({text, onPress, bgcolor, disabled,fullWidth}) => {
  return (
    <View style={{width:fullWidth ? "100%" : null}}>
      <TouchableOpacity disabled={disabled} onPress={onPress}>
        <View
          style={[
            styles.btn,
            {
              backgroundColor: bgcolor,
              opacity: disabled ? 0.5 : 1,
              width: fullWidth ? '100%' : wp(30),
            },
          ]}>
          <Text style={styles.btntxt}>{text}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default SingleButton;

const styles = StyleSheet.create({
  btn: {
    width: wp(30),
    padding: wp(3),
    borderRadius: 50,
    ...center,
  },
  btntxt: {
    color: WHITE_COLOR,
    fontSize: wp(4),
    fontWeight: 'bold',
  },
});

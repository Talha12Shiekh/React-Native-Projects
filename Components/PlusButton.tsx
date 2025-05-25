import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import PlusIcon from 'react-native-vector-icons/AntDesign';

const PlusButton = () => {
  return (
    <TouchableOpacity>
      <View style={styles.plusbtn}>
        <PlusIcon
        name="plus"
        color="white"
        size={30}
        />
      </View>
    </TouchableOpacity>
  );
};

export default PlusButton;

const styles = StyleSheet.create({
  plusbtn: {
    width: 60,
    aspectRatio: 1,
    backgroundColor: 'orange',
    borderRadius: 100,
    position: 'absolute',
    bottom: 30,
    right: 10,
    justifyContent:"center",
    alignItems:"center",
  },
});

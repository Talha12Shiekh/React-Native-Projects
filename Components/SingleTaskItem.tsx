import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

export const TASK_ITEM_BG = '#1f1f1f';

const SingleTaskItem = () => {
    let textlimit = "Hello world how are you fdalkfjd".length;

  return (
    <View style={styles.itemcontainer}>
      <View>
        <BouncyCheckbox
          size={20}
          fillColor="orange"
          unFillColor={TASK_ITEM_BG}
          iconStyle={{borderColor: 'orange'}}
          innerIconStyle={{
            borderWidth: 2,
            borderRadius: 5,
            borderColor: 'grey',
          }}
          onPress={(isChecked: boolean) => {
            console.log(isChecked);
          }}
        />
      </View>
      <View style={styles.tasktextcontainer}>
        {/* <View style={styles.line} /> */}
        <Text style={styles.tasktext}>Hello world how are you fdalkfjd</Text>
      </View>
    </View>
  );
};

export default SingleTaskItem;

const styles = StyleSheet.create({
  itemcontainer: {
    backgroundColor: TASK_ITEM_BG,
    padding: wp(6),
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom:10
  },
  tasktext: {
    color: 'white',
    fontSize: wp(4.5),
  },
  tasktextcontainer: {
    position: 'relative',
  },
  line: {
    position: 'absolute',
    width: '100%',
    height: 3.5,
    backgroundColor: 'orange',
    top: '50%',
    left: '50%',
    transform: [{translateX: '-50%'}, {translateY: '-50%'}],
    zIndex:9999999
  },
});

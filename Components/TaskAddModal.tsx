import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {TASK_ITEM_BG} from './SingleTaskItem';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const TaskAddModal = () => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={false}
      onRequestClose={() => {}}>
      <Pressable
        style={{...StyleSheet.absoluteFillObject}}
        onPress={() => {}}
      />
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignItems: 'center',
            }}>
            <View>
              <BouncyCheckbox
                size={20}
                disabled
                isChecked={false}
                unFillColor={TASK_ITEM_BG}
                innerIconStyle={{
                  borderWidth: 2,
                  borderRadius: 5,
                  borderColor: 'grey',
                }}
              />
            </View>
            <View>
              <TextInput
                value={'fdalkfdsaljfdlakjfdaslk'}
                multiline
                onChangeText={t => {}}
                style={styles.input}
                //   ref={inputref}
              />
            </View>
          </View>

          <View style={styles.btnscontainer}>
            <Pressable onPress={() => {}}>
              <Text style={styles.btntext}>Done</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default TaskAddModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  modalView: {
    backgroundColor: TASK_ITEM_BG,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: wp(90),
    height: hp(23),
    padding: wp(5),
    justifyContent: 'space-between',
    marginBottom: wp(2),
    paddingBottom: wp(6),
  },
  modaltext: {
    color: 'black',
    fontSize: wp(3),
    fontFamily: 'Poppins-Regular',
  },
  input: {
    fontSize: wp(4),
    color: 'white',
  },
  btnscontainer: {
    flexDirection: 'row',
    gap: wp(10),
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  btntext: {
    marginBottom: -wp(2),
    color: 'grey',
    fontWeight: 'bold',
    fontSize: wp(4),
  },
});

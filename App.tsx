import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import SettingsIcon from 'react-native-vector-icons/AntDesign';
import React from 'react';
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import SingleTaskItem from './Components/SingleTaskItem';
import PlusButton from './Components/PlusButton';
import TaskAddModal from './Components/TaskAddModal';

const App = () => {
  return (
    <View style={styles.container}>
      <View style={styles.settingsicons}>
        <TouchableOpacity>
          <SettingsIcon name="setting" color="white" size={20} />
        </TouchableOpacity>
      </View>
      <View style={styles.taskstextcontainer}>
        <Text style={styles.taskstext}>Tasks</Text>
      </View>
      <View style={styles.taskscontainer}>
        <SingleTaskItem/>
        <SingleTaskItem/>
        <SingleTaskItem/>
        <SingleTaskItem/>
        <SingleTaskItem/>
      </View>
      <PlusButton/>
      <TaskAddModal/>  
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: wp(5),
  },
  settingsicons: {
    alignItems: 'flex-end',
  },
  taskstextcontainer:{
    paddingTop:wp(5),
  },
  taskstext:{
    color:"white",
    fontSize:wp(8),
    fontWeight:"100"
  },
  taskscontainer:{
    flex:1,
    paddingVertical:hp(2)
  },
  
});

import * as React from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
} from 'react-native';
import * as Speech from 'expo-speech';

export default function App() {
  const [value, setvalue] = React.useState('');
  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={(vlue) => setvalue(vlue)}
        placeholder="Write Text"
        style={styles.input}
      />
      <View style={styles.btnContainer}>
        <TouchableOpacity
          onPress={() => Speech.speak(value)}
          style={styles.button}>
          <Text style={styles.text}>Speak</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => Speech.stop()}
          style={[styles.button, { backgroundColor: 'orange' }]}>
          <Text style={styles.text}>Stop</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  input: {
    padding: 10,
    borderRadius: 10,
    width: '80%',
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: 'grey',
    fontSize: 20,
  },
  text: {
    color: 'white',
    fontSize: 18,
  },
  button: {
    width: '30%',
    backgroundColor: '#F44336',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    alignSelf: 'center',
    borderWidth: 0,
    borderRadius: 10,
    marginTop: 20,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

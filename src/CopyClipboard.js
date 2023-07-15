import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ToastAndroid
} from 'react-native';
import * as Clipboard from 'expo-clipboard';

export default function App() {
  const [text,settext] = React.useState("");
  const [value,setvalue] = React.useState("");

  const copyToClipboard = async () => {
    ToastAndroid.show("Text Copied to Clipboard !",ToastAndroid.SHORT)
    await Clipboard.setStringAsync(value);
  }

  const fetchFromClipboard = async () => {
    let text = await Clipboard.getStringAsync();
    settext(text);
  }
  
  return (
    <View style={styles.container}>
      <TextInput
      value={value}
        placeholder="Write Text"
        style={styles.input}
        onChangeText={vlue => setvalue(vlue)}
      />
      <View style={styles.btnContainer}>
      <TouchableOpacity onPress={copyToClipboard} style={styles.button}>
        <Text style={styles.text}>Copy Text</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={fetchFromClipboard} style={[styles.button,{backgroundColor:"#00bcd4"}]}>
        <Text style={styles.text}>Retrieve text</Text>
      </TouchableOpacity>
      </View>
      <Text style={styles.copiedText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 20,
  },
  copiedText: {
    marginTop: 10,
    color: 'red',
    fontSize:25,
    textAlign:"center"
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
  button:{
    width:"40%",
    backgroundColor:"#F44336",
    justifyContent:'center',
    alignItems:"center",
    padding:10,
    alignSelf:"center",
    borderWidth:0,
    borderRadius:10
  },
  btnContainer:{
    flexDirection:"row",
    marginTop:20,
    width:"100%",
    alignSelf:"center",
    justifyContent:'space-between'
  },
  text:{
    color:"white",
    fontSize:18
  }
});

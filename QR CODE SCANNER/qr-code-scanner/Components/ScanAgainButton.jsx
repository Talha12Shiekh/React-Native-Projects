import { Text , View , StyleSheet,TouchableOpacity } from "react-native"
import {BLACK_COLOR} from "../Constants.jsx";
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

export default function ScanAgainButton({onPress}){
  return <View>
<TouchableOpacity onPress={onPress}>
<View style={styles.scanbtn}>
<Text style={styles.textstyle}>Scan Another</Text>
</View>
</TouchableOpacity>
</View>
}

const styles = StyleSheet.create({
  scanbtn:{
    width:"90%",
    backgroundColor:BLACK_COLOR,
    padding:wp(2),
    borderRadius:50,
    alignSelf:"center",
    marginBottom:wp(4)
  },
  textstyle:{
    color:"white",
    fontSize:wp(5),
    fontFamily:"Poppins_500Medium",
    textAlign:"center",
    marginTop:wp(2)
  }
})
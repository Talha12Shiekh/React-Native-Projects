import { Text , View , StyleSheet ,TouchableOpacity} from "react-native";
import {center} from "../Constants.jsx";
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

export default function LinkContainer({url,handleLinkToPath}){

  return <View style={styles.linkContainer}>
  <TouchableOpacity onPress={handleLinkToPath}>
  <Text style={styles.textstyle} numberOfLines={5}>
  {url}
  </Text>
  </TouchableOpacity>
  </View>
}

const styles = StyleSheet.create({
  linkContainer:{
    ...center,
    justifyContent:"flex-end",
    paddingHorizontal:wp(5),
  },
   textstyle:{
    color:"white",
    fontSize:wp(5),
    fontFamily:"Poppins_500Medium",
    textDecorationLine: 'underline',
    textAlign:"center"
  }
})
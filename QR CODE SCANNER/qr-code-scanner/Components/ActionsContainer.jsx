import { Text , View , StyleSheet,TouchableOpacity ,Share,ToastAndroid} from "react-native";
import { center,ICONS_SIZE,GREEN_COLOR} from "../Constants.jsx";
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import * as Clipboard from 'expo-clipboard';



export default function ActionsContainer({handleLinkToPath,url}){

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(url);
   ToastAndroid.show('URL Copied to the Clipboard', ToastAndroid.SHORT);
  };

 const handleShare = async () => {
    try {
      const result = await Share.share({
        message:
          url,
      });
    } catch (error) {
      Alert.alert(error.message);
    }
  };



  

const ACTIONS_DATA = [
  {
    icon: <MaterialIcons name="open-in-browser" size={ICONS_SIZE} color={GREEN_COLOR} />,
    text:"Open",
    onPress:handleLinkToPath,
    key:1,
  },
  {
    icon: <Entypo name="share" size={ICONS_SIZE} color={GREEN_COLOR} />,
    text:"Share",
    onPress:handleShare,
    key:2,
  },
  {
    icon: <FontAwesome6 name="copy" size={ICONS_SIZE} color={GREEN_COLOR} />,
    text:"Copy",
    onPress:copyToClipboard,
    key:3,
  }
]
  return  <View style={styles.actionsContainer}>
  {
    ACTIONS_DATA.map(({icon,key,text,onPress}) =>  <TouchableOpacity onPress={onPress} key={key}>
  <View style={styles.singleIconContainer}>
    {icon}
    <Text style={styles.textstyle}>{text}</Text>
   </View> 
   </TouchableOpacity>)
  }
  </View>
}

const styles = StyleSheet.create({
  actionsContainer:{
    alignItems:"flex-start",
    paddingVertical:wp(15),
    flexDirection:"row",
    justifyContent:"space-around"
  },
  textstyle:{
    color:"white",
    fontSize:wp(3),
    fontFamily:"Poppins_400Regular",
  },
  singleIconContainer:{
    flexDirection:"column",
    ...center,
    gap:5
  }
})
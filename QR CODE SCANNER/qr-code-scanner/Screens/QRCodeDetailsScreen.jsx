import { View , StyleSheet,Linking,Alert} from "react-native";
import LinkContainer from "../Components/LinkContainer.jsx";
import ScanAgainButton from "../Components/ScanAgainButton.jsx";
import ActionsContainer from "../Components/ActionsContainer.jsx";
import {BG_COLOR} from "../Constants.jsx";


export default function QRCodeDetailsScreen({route,navigation}){

  let {data} = route.params;
  let url = data;  

const handleLinkToPath = async () => {
    // Check if the URL is valid HTTP or HTTPS
    if (url.startsWith("http://") || url.startsWith("https://")) {
      const supported = await Linking.canOpenURL(url);

      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert(`Don't know how to open this URL: ${url}`);
      }
    } else {
      Alert.alert("Invalid link. Please scan a valid HTTP or HTTPS URL.");
    }
  };

  function handleScanAgain(){
    navigation.popToTop();
  }

  return <View style={styles.container}><View style={styles.container}>
  <LinkContainer
  handleLinkToPath={handleLinkToPath}
  url={url}
  />
 <ActionsContainer
 handleLinkToPath={handleLinkToPath}
 url={url}
 />
  </View>
<ScanAgainButton
onPress={handleScanAgain}
/>
</View>
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:BG_COLOR,
    justifyContent:"center"
  },
})
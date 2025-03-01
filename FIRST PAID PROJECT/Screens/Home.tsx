import {Text,StyleSheet,View,TouchableOpacity} from "react-native";
import {ORANGE_COLOR} from "../Constants";
import { AntDesign } from '@expo/vector-icons';
import {
  useFonts,
  NunitoSans_200ExtraLight,
  NunitoSans_300Light,
  NunitoSans_400Regular,
  NunitoSans_600SemiBold,
  NunitoSans_700Bold,
  NunitoSans_800ExtraBold,
  NunitoSans_900Black,
} from '@expo-google-fonts/nunito-sans';
// import AppLoading from 'expo-app-loading';


const Home = () => {
    let [fontsLoaded] = useFonts({
        NunitoSans_200ExtraLight,
        NunitoSans_300Light,
        NunitoSans_400Regular,
        NunitoSans_600SemiBold,
        NunitoSans_700Bold,
        NunitoSans_800ExtraBold,
        NunitoSans_900Black,
      });


      if (!fontsLoaded) {
        return <View />
      } 
    
    return (
            <View style={styles.homeContainer}>
        <View style={styles.home}>
        <View style={styles.cornerBall}>
            <Text style={styles.ballText}>penny</Text>
            <Text style={[styles.ballText,styles.appeal]}>appeal</Text>
        </View>
    </View>
    <View style={styles.searchBarContainer}>
        <Text style={[styles.searchText]}><Text style={{fontWeight:"bold",fontFamily:"NunitoSans_700Bold"}}>Salam,</Text> Ahmed</Text>
        <TouchableOpacity>
            <AntDesign name="search1" size={35} color="white" />
        </TouchableOpacity>
    </View>
    </View>
    )
}

const styles = StyleSheet.create({
    home:{
        flex:3,
    },
    cornerBall:{
        width:200,
        aspectRatio:1,
        backgroundColor:'white',
        borderRadius:100,
        transform:[{translateX:-40},{translateY:-40}],
        position:"relative"
    },
    ballText:{
        fontSize:30,
        position:"absolute",
        right:50,
        bottom:80,
        color:ORANGE_COLOR,
        fontFamily: 'NunitoSans_300Light'
    },
    homeContainer:{
        flexDirection:"row"
    },
    searchBarContainer:{
        width:"60%",
        justifyContent:"center",
        alignItems:"center",
        flexDirection:"row",
        gap:20,
    },
    searchText:{
        fontSize:20,
        color:"white",
        fontFamily:"NunitoSans_400Regular"
    },
    appeal:{
        bottom:40,right:40,fontWeight:"bold",fontFamily: 'NunitoSans_700Bold'
    }
})

export default Home
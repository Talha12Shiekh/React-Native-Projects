import {StyleSheet, View, Image, TouchableOpacity, Text} from 'react-native';
import {widthPercentageToDP as wp,heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {BG_COLOR, center,BLACK_COLOR} from "../Constants.jsx";





const WelcomeScreen = ({ navigation }) => {
 
  return (
    <View style={styles.container}
  
    >
      <View style={styles.imgContainer}>
        <Image
        source={require("../assets/Welcome-img.jpg")}
        resizeMode="contain"
        style={styles.image}
        />
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity
        onPress={() => navigation.navigate('QRCodeScanner')}
        >
            <View style={styles.btn}>
              <Text style={styles.btnText}>Scan QR Code</Text>
            </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  imgContainer:{
    width:wp(80),
    height:hp(40),
  },
  container:{
    flex:1,
    backgroundColor:BG_COLOR,
    ...center,
  },
  image:{
    width:"100%",
    height:"100%"
  },
  btnText:{
    color:"white",
    fontSize:wp(5),
    fontFamily:"Poppins_500Medium",
    marginTop:wp(2)
  },
  btn:{
    width:"100%",
    backgroundColor:BLACK_COLOR,
    padding:wp(4),
    ...center,
    borderRadius:10
  },
  btnContainer:{
    width:wp(80),
    marginVertical:wp(10),
  }
});

import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState, useRef } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { center, GREEN_COLOR, BLACK_COLOR } from "../Constants.jsx";

export default function QRCodeScannerScreen({ navigation }) {
  const [permission, requestPermission] = useCameraPermissions();
  const [isBarCodeScanned, setIsBarCodeScanned] = useState(true); // Initially set to false
  const CameraRef = useRef(null);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  async function handleBarCodeScanned({ data }) {
    if (isBarCodeScanned) {
      try {
        navigation.navigate("QRCodeDetails", { data });        
        setIsBarCodeScanned(false);
      } catch (error) {
        alert("Failed to take picture. Please try again.");
      }
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.textstyle}>Scan QR Code</Text>
      <View style={styles.scannerblock}>
          <CameraView
            ref={CameraRef}
            onBarcodeScanned={isBarCodeScanned ? handleBarCodeScanned : undefined}
            style={styles.camera}
            facing={"back"}
          />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...center,
    backgroundColor: BLACK_COLOR
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
    ...center,
  },
  scannerblock: {
    width: wp(80),
    height: hp(40),
    borderWidth: 2,
    borderColor: GREEN_COLOR,
    borderStyle: 'dotted',
    borderRadius: 50,
    overflow: "hidden"
  },
  textstyle: {
    color: "white",
    fontSize: wp(8),
    fontFamily: "Poppins_500Medium",
  }
});

import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function App() {
  const [hasPermission, setHasPermission] = React.useState(null);
  const [scanned, setScanned] = React.useState(false);

  React.useEffect(() => {
    const getBarcodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status == 'granted');
    };

    getBarcodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`BarCode with ${type} and data ${data} has been scanned`);
  };

  if (hasPermission == null) {
    return <Text>Requesting for Camera Permissions</Text>;
  }

  if (hasPermission == false) {
    return <Text>No access to Camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned ? (
        <TouchableOpacity
          onPress={() => setScanned(false)}
          style={styles.button}>
          <Text style={styles.text}>Tap to Scan again</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  button: {
    width: '40%',
    backgroundColor: '#F44336',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    alignSelf: 'center',
    borderWidth: 0,
    borderRadius: 10,
    marginTop: 500,
  },
  text: {
    color: 'white',
  },
});

import React, { useState, useEffect } from 'react';
import {
  ToastAndroid,
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Button
} from 'react-native';
import { Asset } from 'expo-asset';
import { manipulateAsync, FlipType, SaveFormat } from 'expo-image-manipulator';
import * as MediaLibrary from 'expo-media-library';

export default function App() {
  const [ready, setReady] = useState(false);
  const [image, setImage] = useState(null);

  const [manipulation, setmanipulation] = useState({
    rotate: 90,
    flip: FlipType.Vertical,
  });

  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();

  useEffect(() => {
    (async () => {
      const image = Asset.fromModule(require('./assets/parrot.png'));
      await image.downloadAsync();
      setImage(image);
      setReady(true);
    })();
  }, []);

  const SaveToGallery = async () => {
    requestPermission();
    await MediaLibrary.saveToLibraryAsync(image.localUri || image.uri);
    ToastAndroid.show('Image saved to gallery !', ToastAndroid.SHORT);
  };

  const ImageManipulation = async () => {
    const manipResult = await manipulateAsync(
      image.localUri || image.uri,
      [{ rotate: manipulation.rotate }, { flip: manipulation.flip }],
      { compress: 1, format: SaveFormat.PNG }
    );
    setImage(manipResult);
  };

  const _renderImage = () => (
    <View style={styles.imageContainer}>
      <Image
        source={{ uri: image.localUri || image.uri }}
        style={styles.image}
      />
    </View>
  );

  const handleRotate90 = () => {
    manipulation.rotate = 90;
    setmanipulation(manipulation);
    ImageManipulation();
  };
  const handleRotate180 = () => {
    manipulation.rotate = 180;
    setmanipulation(manipulation);
    ImageManipulation();
  };
  const handleFlipHorizontal = () => {
    manipulation.flip = FlipType.Horizontal;
    setmanipulation(manipulation);
    ImageManipulation();
  };
  const handleFlipVertically = () => {
    manipulation.flip = FlipType.Vertical;
    setmanipulation(manipulation);
    ImageManipulation();
  };

  return (
    <View style={styles.container}>
      {ready && image && _renderImage()}
      <View style={styles.btnContainer}>
        <TouchableOpacity
          onPress={handleRotate90}
          style={[styles.button, { width: '40%' }]}>
          <Text style={styles.text}>Rotate 90</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleRotate180} style={[styles.button,{width:"40%"}]}>
          <Text style={styles.text}>Rotate 180</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity onPress={handleFlipHorizontal} style={[styles.button,{width:"40%"}]}>
          <Text style={styles.text}>Flip Horizontally</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleFlipVertically} style={[styles.button,{width:"40%"}]}>
          <Text style={styles.text}>Flip Vertically</Text>
        </TouchableOpacity>
      </View>
      <View style={{marginTop:250,width:"80%",alignSelf:'center'}}>
        <Button title="Save to Gallery" onPress={SaveToGallery}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  imageContainer: {
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
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

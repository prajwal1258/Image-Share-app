import React from 'react';
import { Image,Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';
import uploadToAnonymousFilesAsync from 'anonymous-files';

export default function App() {
  let [selectedImage, setSelectedImage] = React.useState(null);
  
  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.rLKV8Ew6V8PhbxoowLwNJYrVoEmBcug6dk();

    if (permissionResult.granted === false) { 
      alert('Permission to access camera roll is required!');
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.cancelled === true) {
      return;
    }
    if (Platform.OS === 'web') {
      let remoteUri = await uploadToAnonymousFilesAsync(pickerResult.uri);
       setSelectedImage({ localUri: pickerResult.uri,remoteUri});
    } else{
      setSelectedImage({ localUri: pickerResult.uri,remoteUri : null });
    }
  };
  let openShareDialogAsync = async () => {
   if (!(await Sharing.isAvailableAsync())){
     alert(`The image is available for sharing at: ${selectedImage.remoteUri}`);
     return;
    }
    Sharing.shareAsync(selectedImage.remoteUri || selectedImage.localUri);
  };

  if (selectedImage !== null) {
    return(
      <View style={styles.container}>
      <Image source = {{ uri:selectedImage.localUri }} style={styles.thumbnail} />
     <TouchableOpacity onPress={openShareDialogAsync} style={styles.button}>
        <Text style={styles.buttonText}>Share this photo
        </Text>
     </TouchableOpacity>
      </View>

    );
  }
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://lh6.ggpht.com/DUWEyFedH_UOoJhiJVDWPD12gW1Rjs81LvOHiwAE-c08lTI4Vy2rsERIACZlAnXTlDQ' }}
        style={styles.logo}
      />
      <Text style={styles.instructions}>
         To share a photo from your phone with a friend, just press the button
        below!
      </Text>

      <TouchableOpacity onPress={openImagePickerAsync} style={styles.button}>
        <Text style={styles.buttonText}>Choose photo</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 305,
    height: 159,
    marginBottom: 20,
    // top: 40,
    // position: 'absolute',
  },
  instructions: {
    color: 'black',
    fontSize: 18,
    marginHorizontal: 15,
    marginBottom: 10,
    // top:200 ,
    // position: 'absolute',
  },
  button: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 14,
    // position: 'absolute',
    // bottom:200,
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
  },
  thumbnail:{
    height:280,
    width:300,
    resizeMode:'contain',
    // position:"absolute",
    // top:0,
  },
  // "splash": {
  // "image": "./assets/splash.png",
  // "resizeMode": "contain",
  // "backgroundColor": "#000000"
 //  },

});

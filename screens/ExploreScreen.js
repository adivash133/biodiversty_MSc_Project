import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
  Image,
  Button,
  Script,
} from "react-native";
// const axios = require("axios");
import axios from "axios";

// import fs from 'react-native-fs';

import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";

// const detect_bird = async (image_location) => {

//   const image = await fs.readFile("YOUR_IMAGE.jpg", {
//       encoding: "base64"
//   });
// import * as RNFS from 'react-native-fs';
// const fs = require ("react-native-fs");

// const fs = require('fs-extra')

// const readFile = () => {
//   try {
//     const contents = fs.readFile('/myfile.txt', 'utf8');
//     console.log(contents);
//   } catch (error) {
//     console.error('Error reading file:', error);
//   }
// };
//   axios({
//       method: "POST",
//       url: "https://detect.roboflow.com/bird-v2/2",
//       params: {
//           api_key: "rf_Bv2fE9kQfcN3T7Iw5Gp3i3KY6Vf1"
//       },
//       data: image,
//       headers: {
//           "Content-Type": "application/x-www-form-urlencoded"
//       }
//   })
//   .then(function(response) {
//       console.log(response.data);
//   })
//   .catch(function(error) {
//       console.log(error.message);
//   });
// // };

import * as FileSystem from "expo-file-system";
const ExploreScreen = ({ navigation }) => {
  const [predictionResult, setPredictionResult] = useState({
    predictions: "Loading...",
  });
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const get_prediction = async (file_location) => {
    const image = await FileSystem.readAsStringAsync(file_location, {
      encoding: FileSystem.EncodingType.Base64,
    });
    axios
      .post("https://detect.roboflow.com/bird-v2/2", image, {
        params: {
          api_key: "Ix0c9yCrPeWSo1PCPO4E",
          // image: "https://cdn11.bigcommerce.com/s-17gicadb8v/images/stencil/1280x720/uploaded_images/top-5-british-birds.jpg?t=1708704758"
        },
        // data: image,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then(function (response) {
        console.log(response.data);
        setPredictionResult({
          predictions:
            response.data["predictions"][0]["class"] +
            " " +
            String(response.data["predictions"][0]["confidence"] * 100),
        });
        return response.data;
      })
      .catch(function (error) {
        console.log(error.message);
      });
  };
  const pickImage = async () => {
    setIsLoading(true);
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      get_prediction(result.assets[0].uri).then(() => {
        console.log("successful");
      });
    }
    setIsLoading(false);
  };

  const takePhoto = async () => {
    setIsLoading(true);
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
    setIsLoading(false);
  };
  return (
    <SafeAreaView style={styles.container}>
      {!image ? (
        <View style={styles.buttonContainer}>
          {isLoading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <>
              <Button
                title="Pick a bird from your gallery"
                onPress={pickImage}
                style={styles.button}
              />
              {/* <Button title="Take a photo of a bird" onPress={takePhoto} /> */}
            </>
          )}
        </View>
      ) : (
        <View style={styles.imageContainer}>
          <Image source={{ uri: image }} style={styles.selectedImage} />
          {/* {get_prediction(image)} */}
          <Text>{predictionResult["predictions"]}</Text>
        </View>
      )}
      <View style={styles.navigateContainer}>
        <Button
          title="Go Back to Welcome"
          onPress={() => navigation.goBack()}
        />
        <Button
          title="Go to Recording Screen"
          onPress={() => navigation.navigate("Recording")}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    width: "80%",
    justifyContent: "space-between",
    height: 150,
    marginBottom: 20,
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  selectedImage: {
    width: 200,
    height: 200,
    resizeMode: "cover",
    marginBottom: 10,
  },
  navigateContainer: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  navigationButton: {
    width: "45%",
  },
});

export default ExploreScreen;

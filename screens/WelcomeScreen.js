import { View, Text, StyleSheet, Button, Image } from "react-native";

export default function WelcomeScreen({ navigation }) {
  return (
    // <View style={styles.container}>
    //   <Text style={styles.text}>Welcome to the monitoring biodiversity app</Text>
    //   <Text>Where would you like to visit today? </Text>
    //   <View style={styles.spacer} />
    //   <View style={styles.buttonContainer}>
    //     <Button title="Wales" onPress={() => navigation.navigate("Explore")} />
    //     <Button
    //       title="Vietnam"
    //       onPress={() => navigation.navigate("Explore")}
    //     />
    //   </View>
    // </View>

    <View style={styles.container}>
      <Text style={styles.text}>
        Welcome to the monitoring biodiversity app
      </Text>
      <Text>Where would you like to visit today?</Text>
      <View style={styles.spacer} />
      <View style={styles.buttonContainer}>
        <View style={styles.flagContainer}>
          <Image source={require("../assets/wales.png")} style={styles.flag} />
          <Button
            title="Wales"
            onPress={() => navigation.navigate("Explore")}
          />
        </View>
        <View style={styles.flagContainer}>
          <Image
            source={require("../assets/vietnam.png")}
            style={styles.flag}
          />
          <Button
            title="Vietnam"
            onPress={() => navigation.navigate("Explore")}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  spacer: {
    height: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "60%",
  },
  flagContainer: {
    alignItems: "center",
  },
  flag: {
    width: 60,
    height: 40,
    marginBottom: 8,
  },
});

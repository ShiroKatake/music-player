import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Slider from "@react-native-community/slider";

const MusicPlayer = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContainer}>
        <Ionicons name="heart-outline" size={30} />
        <Text>Hello World!</Text>
        <Slider />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222831",
  },
  mainContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default MusicPlayer;

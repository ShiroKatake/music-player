import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Slider from "@react-native-community/slider";
import MusicPlayer from "./components/MusicPlayer";

const App = () => {
  return (
    <View style={styles.container}>
      <MusicPlayer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;

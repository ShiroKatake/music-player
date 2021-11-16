import React from "react";
import { View, StatusBar, StyleSheet } from "react-native";
import MusicPlayer from "./components/MusicPlayer";

const App = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#222" />
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

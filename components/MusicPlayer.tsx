import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Slider from "@react-native-community/slider";

const { width, height } = Dimensions.get("window");

const MusicPlayer = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContainer}>
        <View style={styles.artworkWrapper}>
          <Image
            style={styles.artworkImage}
            source={{
              uri: "https://upload.wikimedia.org/wikipedia/en/4/45/Divide_cover.png",
            }}
          />
        </View>
        <View>
          <Text style={styles.title}>Track Title</Text>
          <Text style={styles.artistName}>Artist Name</Text>
        </View>
      </View>
      <View style={styles.navContainer}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => {}}>
            <Ionicons name="heart-outline" size={30} color="#777" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <Ionicons name="repeat" size={30} color="#777" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <Ionicons name="share-outline" size={30} color="#777" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <Ionicons name="ellipsis-horizontal" size={30} color="#777" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222",
  },
  mainContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  artworkWrapper: {
    width: 300,
    height: 300,
    marginBottom: 25,

    //Shadow for iOS
    shadowColor: "#000",
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,

    //Shadow for Android
    borderRadius: 15,
    elevation: 10,
  },
  artworkImage: {
    width: "100%",
    height: "100%",
    borderRadius: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    color: "#eee",
  },
  artistName: {
    fontSize: 16,
    fontWeight: "100",
    textAlign: "center",
    color: "#eee",
  },
  navContainer: {
    borderTopColor: "#393E46",
    borderTopWidth: 1,
    width: width,
    alignItems: "center",
    paddingVertical: 15,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
});

export default MusicPlayer;

import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  Image,
  FlatList,
  Animated,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Slider from "@react-native-community/slider";
import songs from "../assets/data";

const { width, height } = Dimensions.get("window");

const MusicPlayer = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [songIndex, setSongIndex] = useState(0);

  const songSlider = useRef<any>(null);

  useEffect(() => {
    scrollX.addListener(({ value }) => {
      const index = Math.round(value / width);
      setSongIndex(index);
    });
    return () => {
      scrollX.removeAllListeners();
    };
  }, []);

  const skipToNext = () => {
    songSlider.current.scrollToOffset({
      offset: (songIndex + 1) * width,
    });
  };

  const skipToPrevious = () => {
    songSlider.current.scrollToOffset({
      offset: (songIndex - 1) * width,
    });
  };

  const renderSongs = ({ index, item }) => {
    return (
      <Animated.View
        style={{
          width: width,
          justifyContent: "center",
          alignItems: "center",
        }}>
        <View style={styles.artworkWrapper}>
          <Image style={styles.artworkImage} source={item.image} />
        </View>
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContainer}>
        <View style={{ width: width }}>
          <Animated.FlatList
            ref={songSlider}
            data={songs}
            renderItem={renderSongs}
            keyExtractor={(item) => item.id}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            onScroll={Animated.event(
              [
                {
                  nativeEvent: {
                    contentOffset: { x: scrollX },
                  },
                },
              ],
              { useNativeDriver: true },
            )}
          />
        </View>

        <View>
          <Text style={styles.title}>{songs[songIndex].title}</Text>
          <Text style={styles.artistName}>{songs[songIndex].artist}</Text>
        </View>

        <View>
          <Slider
            style={styles.progressBar}
            value={10}
            minimumValue={0}
            maximumValue={100}
            onSlidingComplete={() => {}}
          />
        </View>

        <View style={styles.progressLabelContainer}>
          <Text style={styles.progressLabelText}>0:00</Text>
          <Text style={styles.progressLabelText}>0:00</Text>
        </View>

        <View style={styles.songControls}>
          <TouchableOpacity onPress={skipToPrevious}>
            <Ionicons
              name="play-skip-back-outline"
              size={35}
              color="#FFF"
              style={{ marginTop: 20 }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <Ionicons name="play-circle" size={70} color="#FFF" />
          </TouchableOpacity>
          <TouchableOpacity onPress={skipToNext}>
            <Ionicons
              name="play-skip-forward-outline"
              size={35}
              color="#FFF"
              style={{ marginTop: 20 }}
            />
          </TouchableOpacity>
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
  progressBar: {
    width: 350,
    height: 40,
    marginTop: 25,
    flexDirection: "row",
  },
  progressLabelContainer: {
    width: 300,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  progressLabelText: {
    color: "#fff",
  },
  songControls: {
    flexDirection: "row",
    width: "60%",
    justifyContent: "space-between",
    marginTop: 15,
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

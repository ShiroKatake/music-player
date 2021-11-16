import Slider from "@react-native-community/slider";
import React from "react";
import { View, StyleSheet, Text } from "react-native";
import TrackPlayer, { useProgress } from "react-native-track-player";

export const ProgressBar = () => {
  const progress = useProgress();

  return (
    <>
      <View>
        <Slider
          style={styles.progressBar}
          value={progress.position}
          minimumValue={0}
          maximumValue={progress.duration}
          onSlidingComplete={async (value) => {
            await TrackPlayer.seekTo(value);
          }}
        />
      </View>

      <View style={styles.progressLabelContainer}>
        <Text style={styles.progressLabelText}>
          {new Date(progress.position * 1000).toISOString().substr(14, 5)}
        </Text>
        <Text style={styles.progressLabelText}>
          {new Date(progress.duration * 1000).toISOString().substr(14, 5)}
        </Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
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
});

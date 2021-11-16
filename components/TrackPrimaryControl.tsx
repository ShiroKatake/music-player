import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import TrackPlayer, { State, usePlaybackState } from "react-native-track-player";

import Ionicons from "react-native-vector-icons/Ionicons";

interface ITrackPrimaryControlProps {
  trackSlider: React.MutableRefObject<any>;
  currentTrackIndex: number;
}

export const TrackPrimaryControl = ({
  trackSlider,
  currentTrackIndex,
}: ITrackPrimaryControlProps) => {
  const playbackState = usePlaybackState();

  const skipToPrevious = () => {
    trackSlider.current.scrollToIndex({ index: currentTrackIndex - 1 });
    TrackPlayer.skipToPrevious();
  };

  const togglePlayPause = async (playbackState: State) => {
    const currentTrack = await TrackPlayer.getCurrentTrack();
    if (currentTrack != null) {
      if (playbackState == State.Paused) {
        await TrackPlayer.play();
      } else {
        await TrackPlayer.pause();
      }
    }
  };

  const skipToNext = () => {
    trackSlider.current.scrollToIndex({ index: currentTrackIndex + 1 });
    TrackPlayer.skipToNext();
  };

  return (
    <View style={styles.trackControls}>
      <TouchableOpacity onPress={skipToPrevious}>
        <Ionicons
          name="play-skip-back"
          size={35}
          color="#FFF"
          style={{ marginTop: 20 }}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => togglePlayPause(playbackState)}>
        <Ionicons
          name={playbackState == State.Playing ? "pause-circle" : "play-circle"}
          size={70}
          color="#FFF"
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={skipToNext}>
        <Ionicons
          name="play-skip-forward"
          size={35}
          color="#FFF"
          style={{ marginTop: 20 }}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  trackControls: {
    flexDirection: "row",
    width: "60%",
    justifyContent: "space-between",
    marginTop: 15,
  },
});

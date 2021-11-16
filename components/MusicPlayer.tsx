import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Animated,
} from "react-native";

import TrackPlayer, {
  Event,
  useTrackPlayerEvents,
} from "react-native-track-player";

import tracks from "../assets/data";
import { TrackSecondaryControl } from "./TrackSecondaryControl";
import { TrackPrimaryControl } from "./TrackPrimaryControl";
import { ProgressBar } from "./ProgressBar";
import { TrackInfo } from "./TrackInfo";

const { width, height } = Dimensions.get("window");

const setupPlayer = async () => {
  await TrackPlayer.setupPlayer();
  await TrackPlayer.add(tracks);
};

const MusicPlayer = () => {
  const trackSlider = useRef<any>(null);

  const [trackTitle, setTrackTitle] = useState<string>();
  const [trackArtwork, setTrackArtwork] = useState<any>();
  const [trackArtist, setTrackArtist] = useState<string>();

  const scrollX = useRef(new Animated.Value(0)).current;
  const [trackIndex, setTrackIndex] = useState(0);

  useTrackPlayerEvents([Event.PlaybackTrackChanged], async (event) => {
    if (event.type == Event.PlaybackTrackChanged && event.nextTrack != null) {
      const track = await TrackPlayer.getTrack(event.nextTrack);
      const { title, artwork, artist } = track;
      setTrackTitle(title);
      setTrackArtwork(artwork);
      setTrackArtist(artist);
    }
  });

  const skipTo = async (trackId: number) => {
    await TrackPlayer.skip(trackId);
  };

  useEffect(() => {
    setupPlayer();

    scrollX.addListener(({ value }) => {
      const index = Math.round(value / width);
      skipTo(index);
      setTrackIndex(index);
    });

    return () => {
      scrollX.removeAllListeners();
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContainer}>
        <TrackInfo
          width={width}
          tracks={tracks}
          trackArtwork={trackArtwork}
          trackTitle={trackTitle}
          trackArtist={trackArtist}
          trackSlider={trackSlider}
          scrollX={scrollX}
        />
        <ProgressBar />
        <TrackPrimaryControl
          width={width}
          trackIndex={trackIndex}
          trackSlider={trackSlider}
        />
      </View>
      <TrackSecondaryControl width={width} />
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
});

export default MusicPlayer;

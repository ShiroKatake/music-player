import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";

import TrackPlayer, { Event, useTrackPlayerEvents } from "react-native-track-player";

import tracks from "../assets/data";
import { TrackSecondaryControl } from "./TrackSecondaryControl";
import { TrackPrimaryControl } from "./TrackPrimaryControl";
import { ProgressBar } from "./ProgressBar";
import { TrackInfo } from "./TrackInfo";

const { width, height } = Dimensions.get("window");

const setupPlayer = async () => {
  await TrackPlayer.setupPlayer();
  await TrackPlayer.add(tracks);
  await TrackPlayer.skip(0);
};

const MusicPlayer = () => {
  const [trackTitle, setTrackTitle] = useState<string>();
  const [trackArtist, setTrackArtist] = useState<string>();

  const trackSlider = useRef<any>(null);
  const [trackIndex, setTrackIndex] = useState(0);

  useEffect(() => {
    setupPlayer();
  }, []);

  useEffect(() => {
    trackSlider.current.scrollToIndex({ index: trackIndex });
  }, [trackIndex]);

  const onScrollEnd = async (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setTrackIndex(index);
    // Only skip song if the swipe actually switches to a new song
    if (index != trackIndex) {
      await TrackPlayer.skip(index);
    }
  };

  useTrackPlayerEvents([Event.PlaybackTrackChanged], async (event) => {
    if (event.type === Event.PlaybackTrackChanged && event.nextTrack != null) {
      const track = await TrackPlayer.getTrack(event.nextTrack);
      const { title, artist } = track;
      setTrackTitle(title);
      setTrackArtist(artist);
      setTrackIndex(event.nextTrack);
    }
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContainer}>
        <TrackInfo
          width={width}
          tracks={tracks}
          trackTitle={trackTitle}
          trackArtist={trackArtist}
          trackSlider={trackSlider}
          onScrollEnd={onScrollEnd}
        />
        <ProgressBar />
        <TrackPrimaryControl
          currentTrackIndex={trackIndex}
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

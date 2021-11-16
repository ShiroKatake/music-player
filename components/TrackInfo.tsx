import React, { RefObject } from "react";
import {
  View,
  StyleSheet,
  Text,
  Animated,
  Image,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";

interface ITrackInfoProp {
  width: number;
  tracks: any;
  trackTitle: string | undefined;
  trackArtist: string | undefined;
  trackSlider: RefObject<Animated.FlatList>;
  onScrollEnd: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
}

export const TrackInfo = ({
  width,
  tracks,
  trackTitle,
  trackArtist,
  trackSlider,
  onScrollEnd,
}: ITrackInfoProp) => {
  const scrollX = new Animated.Value(0);

  const renderTracks = ({ item }) => {
    return (
      <Animated.View
        style={{
          width: width,
          justifyContent: "center",
          alignItems: "center",
        }}>
        <View style={styles.artworkWrapper}>
          <Image style={styles.artworkImage} source={item.artwork} />
        </View>
      </Animated.View>
    );
  };

  return (
    <>
      <View style={{ width: width }}>
        <Animated.FlatList
          ref={trackSlider}
          data={tracks}
          renderItem={renderTracks}
          keyExtractor={(item) => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          onMomentumScrollEnd={onScrollEnd}
          // prettier-ignore
          onScroll={Animated.event([{
            nativeEvent: {
              contentOffset: { x: scrollX },
            },
          }], { useNativeDriver: true })}
        />
      </View>

      <View>
        <Text style={styles.trackTitle}>{trackTitle}</Text>
        <Text style={styles.artistName}>{trackArtist}</Text>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
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
  trackTitle: {
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
});

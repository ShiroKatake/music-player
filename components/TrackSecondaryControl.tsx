import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import TrackPlayer, { RepeatMode } from "react-native-track-player";

import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

interface ITrackSecondaryControlProp {
  width: number;
}

export const TrackSecondaryControl = ({ width }: ITrackSecondaryControlProp) => {
  const [repeatMode, setRepeatMode] = useState("off");

  const repeatIcon = () => {
    switch (repeatMode) {
      case "off":
        return "repeat-off";
      case "track":
        return "repeat-once";
      case "repeat":
        return "repeat";

      default:
        break;
    }
  };

  const changeRepeatMode = () => {
    switch (repeatMode) {
      case "off":
        TrackPlayer.setRepeatMode(RepeatMode.Track);
        setRepeatMode("track");
        break;
      case "track":
        TrackPlayer.setRepeatMode(RepeatMode.Queue);
        setRepeatMode("repeat");
        break;
      case "repeat":
        TrackPlayer.setRepeatMode(RepeatMode.Off);
        setRepeatMode("off");
        break;

      default:
        break;
    }
  };

  return (
    <View style={styles(width).navContainer}>
      <View style={styles(width).buttonContainer}>
        <TouchableOpacity onPress={() => {}}>
          <Ionicons name="heart-outline" size={30} color="#777" />
        </TouchableOpacity>
        <TouchableOpacity onPress={changeRepeatMode}>
          <MaterialCommunityIcons name={`${repeatIcon()}`} size={30} color="#777" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          <Ionicons name="share-outline" size={30} color="#777" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          <Ionicons name="ellipsis-horizontal" size={30} color="#777" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

// prettier-ignore
const styles = (width: number) => StyleSheet.create({
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

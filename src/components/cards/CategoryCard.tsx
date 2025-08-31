import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

type Props = {
  imageUrl: string;
  title: string;
  onPress?: () => void;
  style?: ViewStyle;
};

export default function CategoryCard({
  imageUrl,
  title,
  onPress,
  style,
}: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={[styles.shadow, style]}
    >
      <View style={[styles.card]}>
        <ImageBackground
          source={{ uri: imageUrl }}
          resizeMode="contain"
          style={StyleSheet.absoluteFillObject}
        />

        <LinearGradient
          colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.25)", "rgba(0,0,0,0.85)"]}
          locations={[0, 0.45, 1]}
          style={styles.bottomShade}
        />
        <View style={styles.titleWrap}>
          <Text numberOfLines={2} style={styles.title}>
            {title}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const RADIUS = 24;

const styles = StyleSheet.create({
  shadow: {
    borderRadius: RADIUS,
    shadowColor: "#000",
    elevation: 8,
  },
  card: {
    borderRadius: RADIUS,
    overflow: "hidden",
    backgroundColor: "#0f1a14",
    width: 240,
    height: 164,
  },
  bottomShade: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "48%",
  },
  titleWrap: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 16,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 15,
    fontFamily: "Rubik_500Medium",
  },
});

import { COLORS } from "@/src/theme/colors";
import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

type Props = {
  title: string;
  image?: {url:string};
  onPress?: () => void;
  style?: ViewStyle;
};

export default function CategoryTile({ title, image, onPress, style }: Props) {
  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress} style={[styles.card, style]}>
      {!!image && (
        <Image
          source={{ uri: image?.url }}
          style={styles.image}
          resizeMode="contain"
        />
      )}
      <View style={{ padding: 14 }}>
        <Text numberOfLines={2} style={styles.title}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const RADIUS = 16;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: RADIUS,
    overflow: "hidden",
    height: 160,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.06)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  title: {
    fontSize: 20,
    lineHeight: 24,
    fontFamily: "Rubik_500Medium",
    color: COLORS.forestInk,
  },
  image: {
    position: "absolute",
    right: 0,
    bottom: -18,
    width: "62%",
    height: "85%",
  },
});

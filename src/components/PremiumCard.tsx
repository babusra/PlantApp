import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import GradientText from "./GradientText";

type Props = {
  onPress: () => void;
  unread?: number; 
  style?: ViewStyle;
  title?: string;
  subtitle?: string;
};

export default function PremiumBanner({
  onPress,
  unread = 1,
  style,
  title = "FREE Premium Available",
  subtitle = "Tap to upgrade your account!",
}: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={[styles.shadowWrap, style]}
    >
      <LinearGradient
        colors={["#2A241A", "#19150F"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.container}
      >
        <View style={styles.left}>
          <Image
            style={{ width: 50, height: 50 }}
            resizeMode="cover"
            source={require("@/assets/icons/mail.png")}
          />
          {unread > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{unread}</Text>
            </View>
          )}
        </View>

       
        <View style={styles.center}>
          <GradientText
            style={{ fontSize: 20, fontWeight: "600", letterSpacing: 0.2 }}
            colors={["#E5C990","#E4B046"]}
          >
            FREE Premium Available
          </GradientText>

          <GradientText
            style={{ fontSize: 14, fontWeight: "400" }}
            colors={["#F5C25B", "#FFDE9C"]} 
          >
            Tap to upgrade your account!
          </GradientText>
        </View>

        <View style={styles.right}>
          <Ionicons name="chevron-forward" size={20} color="#D0B070" />
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  shadowWrap: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.18,
    shadowRadius: 16,
    elevation: 6,
    borderRadius: 20,
  },
  container: {
    borderRadius: 12,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
  },
  left: {
    marginRight: 12,
  },
  iconBg: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  badge: {
    position: "absolute",
    right: -2,
    top: -2,
    minWidth: 23,
    height: 23,
    paddingHorizontal: 5,
    borderRadius: 25,
    backgroundColor: "#E82C13",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#2A241A",
  },
  badgeText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "700",
  },
  center: {
    flex: 1,
  },
  title: {
    color: "#F7D382",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 2,
  },
  subtitle: {
    color: "#D1B77B",
    fontSize: 14,
    fontWeight: "500",
  },
  right: {
    marginLeft: 8,
  },
});

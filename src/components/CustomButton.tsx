import React from "react";
import {
    StyleSheet,
    Text,
    TextStyle,
    TouchableOpacity,
    ViewStyle,
} from "react-native";

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export default function CustomButton({
  title,
  onPress,
  style,
  textStyle,
}: CustomButtonProps) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#28AF6E",
    borderRadius: 12,
    padding: 18,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    alignSelf: "stretch",
  },
  text: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },
});

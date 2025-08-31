import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text, TextStyle } from "react-native";

type Props = {
  children: React.ReactNode;
  style?: TextStyle;
  colors?: string[];
  start?: { x: number; y: number };
  end?: { x: number; y: number };
  numberOfLines?: number;
};

export default function GradientText({
  children,
  style,
  colors = ["#F7D382", "#E3B85F"], 
  start = { x: 0, y: 0.5 },
  end   = { x: 1, y: 0.5 },
  numberOfLines,
}: Props) {
  return (
    <MaskedView
      maskElement={
        <Text
          numberOfLines={numberOfLines}
          style={[style, { backgroundColor: "transparent" }]}
        >
          {children}
        </Text>
      }
    >
      <LinearGradient colors={colors} start={start} end={end}>
        <Text numberOfLines={numberOfLines} style={[style, styles.invisible]}>
          {children}
        </Text>
      </LinearGradient>
    </MaskedView>
  );
}

const styles = StyleSheet.create({
  invisible: { opacity: 0 },
});

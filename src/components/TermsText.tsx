import React from "react";
import { Alert, StyleSheet, Text, View } from "react-native";

export default function TermsText() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        By tapping next, you are agreeing to PlantID{" "}
        <Text
          style={styles.link}
          onPress={() => Alert.alert("Terms of Use pressed")}
        >
          Terms of Use
        </Text>{" "}
        &{" "}
        <Text
          style={styles.link}
          onPress={() => Alert.alert("Privacy Policy pressed")}
        >
          Privacy Policy
        </Text>
        .
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 18, alignItems: "center", paddingHorizontal: 50 },
  text: {
    fontFamily: "Rubik_400Regular",
    fontSize: 11,
    lineHeight: 15,
    letterSpacing: 0.07,
    textAlign: "center",
    color: "#597165B2",
  },
  link: { textDecorationLine: "underline" },
});

import CustomButton from "@/src/components/CustomButton";
import TermsText from "@/src/components/TermsText";
import { router } from "expo-router";
import React from "react";
import { Image, ImageBackground, SafeAreaView, StyleSheet, Text, View } from "react-native";

const GetStartedScreen = () => {
  return (
    <ImageBackground
      resizeMode="cover"
      style={styles.image}
      source={require("@/assets/images/Background.png")}
    >
      <SafeAreaView style={styles.container}>
      <View
        style={{
          gap: 10,
          paddingHorizontal: 24,
          paddingVertical: 15,
        }}
      >
        <Text style={styles.title}>
          Welcome to
          <Text style={styles.boldTitle}> PlantApp</Text>
        </Text>
        <Text style={styles.description}>
          Identify more than 3000+ plants and {`\n`}88% accuracy.
        </Text>
      </View>
      <View
        style={{ alignItems: "center", paddingHorizontal: 20}}
      >
        <Image source={require("@/assets/images/getStartedPlant.png")}   />
        <CustomButton
          title="Get Started"
          onPress={() => router.push("/(onboarding)/onboarding1")}
        />
        <TermsText />
      </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default GetStartedScreen;
const styles = StyleSheet.create({
  container: { flex: 1 },
  content: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  blurContainer: {
    flex: 1,
    padding: 20,
    margin: 16,
    textAlign: "center",
    justifyContent: "center",
    overflow: "hidden",
    borderRadius: 20,
  },
  title: {
    fontSize: 28,
    color: "#13231B",
    fontFamily: "Rubik_400Regular",
  },
  description: {
    fontSize: 16,
    color: "#13231BB2",
    fontFamily: "Rubik_400Regular",
    lineHeight: 22,
    letterSpacing: 0.07,
  },
  boldTitle: {
    fontSize: 28,
    color: "#13231B",
    fontFamily: "Rubik_600SemiBold",
  },
  image: {
    justifyContent: "center",
    height: "100%",
  },
});

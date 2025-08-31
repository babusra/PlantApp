import CustomButton from "@/src/components/CustomButton";
import TermsText from "@/src/components/TermsText";
import { COLORS } from "@/src/theme/colors";
import { useS } from "@/src/utils/stale";
import { router } from "expo-router";
import React, { useMemo } from "react";
import {
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const GetStartedScreen = () => {
  const { s, fs } = useS();
  const styles = useMemo(() => createStyles(s, fs), [s, fs]);

  return (
    <ImageBackground
      resizeMode="cover"
      style={styles.image}
      source={require("@/assets/images/Background.png")}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.headerBlock}>
          <Text style={styles.title}>
            Welcome to
            <Text style={styles.boldTitle}> PlantApp</Text>
          </Text>
          <Text style={styles.description}>
            Identify more than 3000+ plants and {`\n`}88% accuracy.
          </Text>
        </View>

        <Image
          source={require("@/assets/images/plant.png")}
          style={styles.plant}
        />

        <View style={styles.footerBlock}>
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

const createStyles = (s: (n: number) => number, fs: (n: number) => number) =>
  StyleSheet.create({
    container: { flex: 1 },
    image: {
      justifyContent: "center",
      height: "100%",
    },
    headerBlock: {
      gap: s(10),
      paddingHorizontal: s(24),
      paddingBottom: s(30),
    },
    title: {
      fontSize: fs(28),
      color: COLORS.forestInk,
      fontFamily: "Rubik_400Regular",
    },
    boldTitle: {
      fontSize: fs(28),
      color: COLORS.forestInk,
      fontFamily: "Rubik_600SemiBold",
    },
    description: {
      fontSize: fs(16),
      color: "#13231BB2",
      fontFamily: "Rubik_400Regular",
      lineHeight: fs(22),
      letterSpacing: 0.07,
    },
    plant: {
      width: "100%",
      height: "70%",
    },
    footerBlock: {
     paddingHorizontal: s(24),  marginBottom: s(20)
    },
  });

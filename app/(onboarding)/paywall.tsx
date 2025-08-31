import { FeatureCard } from "@/src/components/cards/FeatureCard";
import CustomButton from "@/src/components/CustomButton";
import SubscriptionSelector, { PlanOption } from "@/src/components/SubscriptionSelector";
import { COLORS } from "@/src/theme/colors";
import { useS } from "@/src/utils/stale";
import { Ionicons } from "@expo/vector-icons";
import React, { useMemo, useState } from "react";
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { setStarted } from "@/src/redux/store/appSlice";
import { useAppDispatch } from "@/src/redux/store/hooks";
import { useRouter } from "expo-router";

const OPTIONS: PlanOption[] = [
  { key: "month", title: "1 Month", subtitle: "$2.99/month, auto renewable" },
  { key: "year", title: "1 Year", subtitle: "First 3 days free, then $529,99/year", isDiscounted: true, discountLabel: "Save 50%" },
];

const Paywall = () => {
  const [plan, setPlan] = useState<string>("year");
  const insets = useSafeAreaInsets();
  const { s, fs } = useS();
  const styles = useMemo(() => createStyles(s, fs), [s, fs]);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const onContinue = () => {
    dispatch(setStarted(true));         
    router.replace("/(tabs)");        
  };

  return (
    <View style={styles.root}>
      <ImageBackground
        resizeMode="cover"
        style={styles.heroBg}
        source={require("@/assets/images/Image.png")}
      >
        <View style={styles.heroContent}>
          <View style={styles.titleBlock}>
            <Text style={styles.title}>
              PlantApp
              <Text style={styles.titleLight}> Premium</Text>
            </Text>
            <Text style={styles.subtitle}>Access All Features</Text>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.featuresContent}
          >
            <FeatureCard
              icon={
                <Image
                  source={require("@/assets/icons/Scanner.png")}
                  style={styles.iconFill}
                />
              }
              title="Unlimited"
              desc="Plant Identify"
            />
            <FeatureCard
              icon={
                <Image
                  source={require("@/assets/icons/Speed.png")}
                  style={styles.iconFill}
                />
              }
              title="Faster"
              desc="Process"
            />
            <FeatureCard
              icon={<Ionicons name="leaf" size={s(20)} color="rgba(255,255,255,0.7)" />}
              title="Detailed"
              desc="Plant care"
            />
          </ScrollView>
        </View>
      </ImageBackground>

      <View style={[styles.bottom, { bottom: insets.bottom + s(16) }]}>
        <SubscriptionSelector options={OPTIONS} value={plan} onChange={setPlan} />
        <CustomButton
          title={plan === "year" ? "Try free for 3 days" : "Continue"}
          onPress={onContinue}
          style={styles.cta}
        />
        <Text style={styles.disclaimer}>
          After the 3-day free trial period you’ll be charged $274.99 per year unless you cancel
          before the trial expires. Yearly Subscription is Auto-Renewable
        </Text>
        <Text style={styles.links}>Terms • Privacy • Restore</Text>
      </View>
    </View>
  );
};

export default Paywall;

const createStyles = (s: (n: number) => number, fs: (n: number) => number) =>
  StyleSheet.create({
    root: { flex: 1, backgroundColor: COLORS.forestNight },
    heroBg: { width: "100%", height: "60%", flex: 1, justifyContent: "center" },
    heroContent: { paddingBottom: s(64) },
    titleBlock: { paddingLeft: s(24), paddingBottom: s(12) },
    title: { color: "#fff", fontFamily: "Rubik_700Bold", fontSize: fs(30), paddingVertical: s(8) },
    titleLight: { fontFamily: "Rubik_300Light" },
    subtitle: { color: "#fff", fontFamily: "Rubik_300Light", lineHeight: fs(24), fontSize: fs(17) },
    featuresContent: { flexDirection: "row", gap: s(8), paddingVertical: s(10), paddingLeft: s(24) },
    iconFill: { width: "100%", height: "100%" },
    bottom: { position: "absolute", paddingHorizontal: s(24), width: "100%", gap: s(10) },
    cta: { marginTop: s(12) },
    disclaimer: {
      color: "rgba(255,255,255,0.52)",
      fontSize: fs(9),
      textAlign: "center",
      fontFamily: "Rubik_300Light",
      paddingHorizontal: s(8),
      lineHeight: fs(12),
    },
    links: {
      color: "rgba(255,255,255,0.52)",
      fontSize: fs(12),
      textAlign: "center",
      fontFamily: "Rubik_400Regular",
    },
  });

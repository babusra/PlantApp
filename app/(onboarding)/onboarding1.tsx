import CustomButton from "@/src/components/CustomButton";
import { setHasOnboarded } from "@/src/redux/store/appSlice";
import { useAppDispatch } from "@/src/redux/store/hooks";
import { COLORS } from "@/src/theme/colors";
import { useS } from "@/src/utils/stale";
import { useRouter } from "expo-router";
import React, { useMemo, useRef, useState } from "react";
import {
  Image,
  ImageBackground,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import PagerView, { PagerViewOnPageSelectedEvent } from "react-native-pager-view";

const PAGES = [
  {
    key: "p1",
    titleTop: "Take a photo to",
    titleBold: " identify ",
    titleEnd: "the plant!",
    hero: require("@/assets/images/Content.png"),
    underline: { show: true, width: 150, height: 30, right: 35, bottom: 6 },
  },
  {
    key: "p2",
    titleTop: "Get plant ",
    titleBold: "care guides",
    titleEnd: "",
    hero: require("@/assets/images/FlatiPhone.png"),
    underline: { show: true, width: 150, height: 30, rightPct: 0.2, bottom: 6 },
  },
] as const;

export default function Onboarding1() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { s, fs, width } = useS();
  const styles = useMemo(() => createStyles(s, fs), [s, fs]);
  const pagerRef = useRef<PagerView>(null);
  const [page, setPage] = useState(0);

  const onPageSelected = (e: PagerViewOnPageSelectedEvent) => setPage(e.nativeEvent.position);

  const handleContinue = () => {
    if (page < PAGES.length - 1) {
      pagerRef.current?.setPage(page + 1);
      return;
    }
    dispatch(setHasOnboarded(true));
    router.push("/(onboarding)/paywall");
  };
  return (
    <ImageBackground
      source={require("@/assets/images/Background.png")}
      resizeMode="cover"
      style={styles.bg}
    >
      <Image
        source={require("@/assets/images/Leaves.png")}
        resizeMode="contain"
        style={[styles.leaves, page === 0 && styles.hidden]}
      />
      <SafeAreaView style={styles.container}>
        <PagerView
          ref={pagerRef}
          style={styles.pager}
          initialPage={0}
          onPageSelected={onPageSelected}
        >
          {PAGES.map((p) => {
            const underlineRight =
              "rightPct" in p.underline && p.underline.rightPct
                ? width * (p.underline.rightPct as number)
                : (p.underline.right as number);

            return (
              <View key={p.key} style={styles.page}>
                <View style={styles.header}>
                  {Platform.OS === "android" && (
                    <Text style={[styles.title, styles.titleShadowAndroid]}>
                      {p.titleTop}
                      <Text style={styles.titleBold}>{p.titleBold}</Text>
                      {p.titleEnd}
                    </Text>
                  )}
                  <Text style={[styles.title, styles.titleShadowIos]}>
                    {p.titleTop}
                    <Text style={styles.titleBold}>{p.titleBold}</Text>
                    {p.titleEnd}
                  </Text>
                </View>

                {p.underline?.show && (
                  <>
                    <Image
                      source={require("@/assets/images/rectangle.png")}
                      style={[
                        styles.underlineShadow,
                        {
                          width: s(p.underline.width),
                          height: s(p.underline.height),
                          right: underlineRight,
                          bottom: s((p.underline.bottom ?? 0) - 2),
                        },
                      ]}
                      fadeDuration={0}
                    />
                    <Image
                      source={require("@/assets/images/rectangle.png")}
                      style={[
                        styles.underline,
                        {
                          width: s(p.underline.width),
                          height: s(p.underline.height),
                          right: underlineRight,
                          bottom: s(p.underline.bottom ?? 0),
                        },
                      ]}
                      fadeDuration={0}
                    />
                  </>
                )}

                <View style={styles.hero}>
                  <Image
                    source={p.hero}
                    resizeMode={p.key === "p1" ? "cover" : "contain"}
                    style={p.key === "p1" ? styles.heroImageP1 : styles.heroImageP2}
                  />
                  {p.key === "p2" && (
                    <Image
                      source={require("@/assets/images/Artwork.png")}
                      style={styles.artwork}
                    />
                  )}
                  {page === 1 && (
                    <Image
                      source={require("@/assets/images/Overlay.png")}
                      style={styles.overlay}
                    />
                  )}
                </View>
              </View>
            );
          })}
        </PagerView>

        <View style={styles.actions}>
          <CustomButton title="Continue" onPress={handleContinue} />
          <View style={styles.dots}>
            {PAGES.map((_, i) => (
              <View key={i} style={[styles.dot, i === page && styles.dotActive]} />
            ))}
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const createStyles = (s: (n: number) => number, fs: (n: number) => number) =>
  StyleSheet.create({
    bg: { flex: 1 },
    leaves: { ...StyleSheet.absoluteFillObject },
    hidden: { opacity: 0 },
    container: { flex: 1 },
    pager: { flex: 1, paddingTop: s(20) },
    page: { flex: 1, justifyContent: "flex-start" },
    header: { paddingHorizontal: s(24), marginBottom: s(8), position: "relative" },
    title: {
      fontSize: fs(28),
      color: COLORS.forestInk,
      fontFamily: "Rubik_500Medium",
      lineHeight: fs(34),
    },
    titleBold: {
      fontSize: fs(28),
      color: COLORS.forestInk,
      fontFamily: "Rubik_800ExtraBold",
    },
    titleShadowIos: Platform.select({
      ios: {
        textShadowColor: "rgba(0, 0, 0, 0.2)",
        textShadowOffset: { width: 5, height: 5 },
        textShadowRadius: 5,
      },
      android: {},
      default: {},
    }),
    titleShadowAndroid: {
      position: "absolute",
      left: s(24),
      right: s(24),
      color: "#000",
      opacity: 0.18,
      top: s(4),
      includeFontPadding: false,
    },
    underline: { position: "absolute", top: s(30) },
    underlineShadow: {
      position: "absolute",
      top: s(30),
      opacity: 0.25,
      transform: [{ scaleX: 1.02 }],
    },
    hero: { flexGrow: 1, alignItems: "center" },
    heroImageP1: {
      height: "120%",
      width: "90%",
      position: "absolute",
      top: "0%",
    },
    heroImageP2: {
      height: "100%",
      width: "90%",
      position: "absolute",
      top: "10%",
    },
    artwork: {
      position: "absolute",
      width: "100%",
      height: "50%",
    },
    overlay: { position: "absolute", top: "60%" },
    actions: { paddingHorizontal: s(24), gap: s(12), marginBottom: s(20) },
    dots: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      gap: s(6),
      marginTop: s(8),
    },
    dot: {
      width: s(6),
      height: s(6),
      borderRadius: s(30),
      backgroundColor: "#13231B40",
    },
    dotActive: {
      backgroundColor: COLORS.forestInk,
      width: s(10),
      height: s(10),
      borderRadius: s(50),
    },
  });

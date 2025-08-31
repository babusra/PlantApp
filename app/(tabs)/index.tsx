import { getCategories, getQuestions } from "@/src/api/services/appServices";
import CategoryCard from "@/src/components/cards/CategoryCard";
import CategoriesGrid from "@/src/components/CategoriesGrid";
import PremiumBanner from "@/src/components/PremiumCard";
import { COLORS } from "@/src/theme/colors";
import { useS } from "@/src/utils/stale";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import React, { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const HERO_H = "25%";

type Question = { id: string | number; title?: string; image_uri?: string };
type Category = { id: string | number; title?: string; image_uri?: string };

const HomeScreen = () => {
  const insets = useSafeAreaInsets();
  const { s, fs } = useS();
  const styles = useMemo(() => createStyles(s, fs), [s, fs]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const [qs, cs] = await Promise.all([
          getQuestions<Question[]>(),
          getCategories<Category[]>(),
        ]);
        if (!mounted) return;
        setQuestions(Array.isArray(qs) ? qs : []);
        setCategories(Array.isArray(cs) ? cs : []);
      } catch (e: any) {
        if (!mounted) return;
        setError(e?.message ?? "Veri alınamadı");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <View style={styles.root}>
      <View style={styles.hero}>
        <ImageBackground
          source={require("@/assets/images/HomeBG.png")}
          style={StyleSheet.absoluteFillObject}
          resizeMode="cover"
        />

        <View style={[styles.header, { paddingTop: insets.top }]}>
          <Text style={styles.hello}>Hi, plant lover!</Text>
          <Text style={styles.title}>
            Good Afternoon! <Text>⛅️</Text>
          </Text>
        </View>

        <View style={styles.searchWrap}>
          <View style={styles.searchContainer}>
            <BlurView intensity={10} tint="light" style={StyleSheet.absoluteFill} />
            <View style={styles.searchOverlay} />
            <View style={styles.searchContent}>
              <Ionicons name="search" size={s(18)} color="#94A3B8" />
              <TextInput
                placeholder="Search for plants"
                placeholderTextColor="#94A3B8"
                style={styles.searchInput}
                returnKeyType="search"
              />
            </View>
          </View>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        <View style={styles.headerBlock}>
          <PremiumBanner onPress={() => {}} />
          <Text style={styles.sectionTitle}>Get Started</Text>
        </View>

        {loading && <ActivityIndicator style={styles.loader} />}

        {error && <Text style={styles.errorText}>{error}</Text>}

        {!loading && !error && (
          <FlatList
            data={questions}
            keyExtractor={(item) => String(item.id)}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.questionsListContent}
            renderItem={({ item }) => (
              <CategoryCard
                imageUrl={item.image_uri}
                title={item.title ?? "Category"}
                onPress={() => {}}
              />
            )}
          />
        )}

        {!loading && !error && (
          <CategoriesGrid data={categories} onPressItem={() => {}} />
        )}
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const createStyles = (s: (n: number) => number, fs: (n: number) => number) =>
  StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: "#FBFAFA",
    },
    hero: {
      height: HERO_H as any,
    },
    header: {
      paddingHorizontal: s(20),
    },
    hello: {
      fontSize: fs(16),
      fontFamily: "Rubik_400Regular",
      color: COLORS.forestInk,
      opacity: 0.8,
      marginBottom: s(4),
    },
    title: {
      fontSize: fs(24),
      fontFamily: "Rubik_500Medium",
      color: COLORS.forestInk,
    },
    searchWrap: {
      position: "absolute",
      left: s(16),
      right: s(16),
      bottom: s(10),
    },
    searchContainer: {
      borderRadius: s(12),
      overflow: "hidden",
    },
    searchOverlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: "rgba(255,255,255,0.90)",
    },
    searchContent: {
      flexDirection: "row",
      alignItems: "center",
      gap: s(10),
      height: s(50),
      paddingHorizontal: s(14),
    },
    searchInput: {
      flex: 1,
      fontSize: fs(16),
      color: "#111827",
    },
    content: {
      flex: 1,
    },
    headerBlock: {
      padding: s(24),
    },
    sectionTitle: {
      fontSize: fs(15),
      fontFamily: "Rubik_500Medium",
      paddingTop: s(32),
    },
    loader: {
      marginTop: s(8),
    },
    errorText: {
      color: "#B91C1C",
      fontSize: fs(14),
      paddingHorizontal: s(24),
    },
    questionsListContent: {
      paddingLeft: s(24),
      paddingBottom: s(4),
      gap: s(10),
    },
  });

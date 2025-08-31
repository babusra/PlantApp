import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { COLORS } from "../theme/colors";

export type PlanOption = {
  key: string;
  title: string;
  subtitle?: string;
  isDiscounted?: boolean;
  discountLabel?: string;
};

type Theme = {
  accent: string;
  selectedBg: string;
  unselectedBg: string;
  selectedBorder: string;
  unselectedBorder: string;
  cardRadius: number;
};

type Props = {
  options: PlanOption[];
  value: string;
  onChange: (key: string) => void;
  style?: ViewStyle;
  theme?: Partial<Theme>;
};

const DEFAULT_THEME: Theme = {
  accent: COLORS.canopyGreen,
  selectedBg: "rgba(34,197,94,0.10)",
  unselectedBg: "rgba(255, 255, 255, 0.05)",
  selectedBorder: COLORS.canopyGreen,
  unselectedBorder: "#3a3a3a",
  cardRadius: 14,
};

const SubscriptionSelector: React.FC<Props> = ({
  options,
  value,
  onChange,
  style,
  theme,
}) => {
  const t = { ...DEFAULT_THEME, ...(theme || {}) };

  return (
    <View style={[styles.container, style]}>
      {options.map((opt) => {
        const selected = opt.key === value;
        const borderColor = selected ? t.selectedBorder : t.unselectedBorder;

        const CardWrapper: React.FC<{ children: React.ReactNode }> = ({
          children,
        }) =>
          selected ? (
            <LinearGradient
              colors={[COLORS.forestNight, COLORS.canopyGreen]} 
              start={{ x: 0, y: 0 }}
              end={{ x: 7, y: 0 }}
              style={[
                styles.card,
                {
                  borderColor,
                  borderRadius: t.cardRadius,
                  borderWidth: 1.5,
                },
              ]}
            >
              {children}
            </LinearGradient>
          ) : (
            <View
              style={[
                styles.card,
                {
                  backgroundColor: t.unselectedBg,
                  borderColor,
                  borderRadius: t.cardRadius,
                  borderWidth: 0.5,
                },
              ]}
            >
              {children}
            </View>
          );

        return (
          <TouchableOpacity
            key={opt.key}
            activeOpacity={0.9}
            onPress={() => onChange(opt.key)}
          >
            <CardWrapper>
              {selected ? (
                <View
                  style={[
                    styles.radioCircle,
                    { backgroundColor: COLORS.canopyGreen, justifyContent: "center" },
                  ]}
                >
                  <View
                    style={[
                      styles.radioCircle,
                      {
                        backgroundColor: "#fff",
                        marginRight: 0,
                        width: 9,
                        height: 9,
                      },
                    ]}
                  />
                </View>
              ) : (
                <View style={[styles.radioCircle]}></View>
              )}

              <View style={{ flex: 1 }}>
                <Text style={styles.title}>{opt.title}</Text>
                {!!opt.subtitle && (
                  <Text style={styles.subtitle}>{opt.subtitle}</Text>
                )}
              </View>

              {opt.isDiscounted && (
                <View
                  pointerEvents="none"
                  style={[
                    styles.badgeWrap,
                    {
                      borderTopRightRadius: t.cardRadius,
                      top: selected ? -1.5 : 0,
                    },
                  ]}
                >
                  <View
                    style={[
                      styles.badge,
                      {
                        backgroundColor: t.accent,
                        borderTopRightRadius: t.cardRadius,
                      },
                    ]}
                  >
                    <Text style={styles.badgeText}>
                      {opt.discountLabel || "Save"}
                    </Text>
                  </View>
                </View>
              )}
            </CardWrapper>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default SubscriptionSelector;

const styles = StyleSheet.create({
  container: { gap: 14 },
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },

  radioCircle: {
    width: 24,
    height: 24,
    borderRadius: 24,
    backgroundColor: "rgba(255,255,255,0.08)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  radioDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  title: {
    fontSize: 16,
    color: "#ffffff",
    fontFamily: "Rubik_500Medium",
  },
  subtitle: {
    marginTop: 2,
    fontSize: 12,
    color: "#bdbdbd",
    fontFamily: "Rubik_400Regular",
  },
  badgeWrap: {
    position: "absolute",
    top: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  badge: {
    height: 32,
    paddingHorizontal: 12,
    justifyContent: "center",
    borderBottomLeftRadius: 20,
    borderTopLeftRadius: 0,
  },
  badgeText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "800",
  },
});

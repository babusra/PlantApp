import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import React from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { COLORS } from "../theme/colors";

const { width } = Dimensions.get("window");

const ACTIVE = COLORS.canopyGreen; 
const INACTIVE = "#BDBDBD"; 
const BG = "#FFFFFF";

export default function CustomTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  const renderIcon = (routeName: string, focused: boolean) => {
    const color = focused ? ACTIVE : INACTIVE;

    switch (routeName) {
      case "index":
        return (
          <Image
            source={require("@/assets/icons/home.png")}
            style={{ width: 20, height: 20, tintColor: color }}
            resizeMode="contain"
          />
        );
      case "diagnose":
        return (
          <Image
            source={require("@/assets/icons/diagnose.png")}
            style={{ width: 25, height: 25, tintColor: color }}
            resizeMode="contain"
          />
        );
      case "garden":
        return (
          <Image
            source={require("@/assets/icons/garden.png")}
            style={{ width: 25, height: 25, tintColor: color }}
            resizeMode="contain"
          />
        );
      case "profile":
        return (
          <Image
            source={require("@/assets/icons/profile.png")}
            style={{ width: 25, height: 25, tintColor: color }}
            resizeMode="contain"
          />
        );
      default:
        return (
          <Image
            source={require("@/assets/icons/home.png")}
            style={{ width: 20, height: 20, tintColor: color }}
            resizeMode="contain"
          />
        );
    }
  };

  const getLabel = (routeName: string) => {
    switch (routeName) {
      case "index":
        return "Home";
      case "diagnose":
        return "Diagnose";
      case "garden":
        return "My Garden";
      case "profile":
        return "Profile";
      default:
        return routeName;
    }
  };

  return (
    <View style={{ backgroundColor: "#f4f7ff" }}>
      <View style={{ ...styles.container, paddingBottom: insets.bottom }}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;

          if (route.name === "scan") {
            return (
              <Animated.View key={route.key} style={styles.fabWrapper}>
                <TouchableOpacity
                  style={styles.fab}
                  onPress={() => navigation.navigate("scan")}
                  activeOpacity={0.9}
                >
                  <Image
                    source={require("@/assets/icons/scan.png")}
                    style={{ width: 30, height: 30, tintColor: "#fff" }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </Animated.View>
            );
          }

          if (route.name === "diagnose") {
            return (
              <>
                <TouchableOpacity
                  key={route.key}
                  onPress={() => navigation.navigate(route.name)}
                  style={[styles.tabbarItem, { marginRight: 30 }]}
                >
                  {renderIcon(route.name, isFocused)}
                  <Text
                    style={[
                      styles.tabLabel,
                      {
                        color: isFocused ? ACTIVE : INACTIVE,
                        fontWeight: isFocused ? "600" : "400",
                      },
                    ]}
                  >
                    {getLabel(route.name)}
                  </Text>
                </TouchableOpacity>
                <View key="spacer" style={{ width: 60 }} />
              </>
            );
          }

          return (
            <TouchableOpacity
              key={route.key}
              onPress={() => navigation.navigate(route.name)}
              style={[
                styles.tabbarItem,
                route.name === "garden" && { marginLeft: -35 },
              ]}
            >
              {renderIcon(route.name, isFocused)}
              <Text
                style={[
                  styles.tabLabel,
                  {
                    color: isFocused ? ACTIVE : INACTIVE,
                    fontWeight: isFocused ? "600" : "400",
                  },
                ]}
              >
                {getLabel(route.name)}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const FAB_SIZE = 72;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: BG,
    justifyContent: "space-around",
    position: "relative",
    paddingTop: 15,
    // shadowColor: "#DDDDDD",
    // shadowOffset: { width: 0, height: 0 },
    // shadowOpacity: 1,
    // shadowRadius: 5,
    elevation: 10,
    borderTopWidth:2,
    borderTopColor:"#F4F6F6"
  },
  fabWrapper: {
    position: "absolute",
    top: -FAB_SIZE / 2,
    left: width / 2 - FAB_SIZE / 2,
    width: FAB_SIZE,
    height: FAB_SIZE,
    borderRadius: FAB_SIZE / 2,
    backgroundColor: ACTIVE,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: ACTIVE,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 6,
    borderWidth: 5,
    borderColor: "#2CCC80",
  },
  fab: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tabbarItem: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  
  tabLabel: {
    fontSize: 12,
    fontFamily:"Rubik_400Regular",
    marginTop: 6,
  },
});

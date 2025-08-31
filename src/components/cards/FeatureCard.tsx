import React from "react";
import { StyleSheet, Text, View } from "react-native";

type FeatureCardProps = {
  icon: any;
  title: string;
  desc: string;
};

export function FeatureCard({ icon, title, desc }: FeatureCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.iconWrap}>
        {icon}
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.desc}>{desc}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 156,
    height: 130,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.08)", 
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    padding: 16,
    justifyContent: "flex-start",
    
    
  },
  iconWrap: {
    width: 34,
    height: 34,
    borderRadius: 8,
    backgroundColor: "rgba(0,0,0,0.3)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  title: {
    color: "#fff",
    fontFamily: "Rubik_500Medium",
    fontSize: 20,
    paddingBottom: 8,
  },
  desc: {
    color: "rgba(255,255,255,0.75)",
    fontFamily: "Rubik_400Regular",
    fontSize: 13,
  },
});

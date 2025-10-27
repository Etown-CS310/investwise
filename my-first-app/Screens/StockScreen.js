// screens/StockScreen.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function StockScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>📈 Live Stock Data Coming Soon!</Text>
      <Text style={styles.subText}>
        Stay tuned for real-time market insights.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subText: { color: "#aaa", fontSize: 16 },
});

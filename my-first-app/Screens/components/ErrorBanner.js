import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function ErrorBanner({ message }) {
  if (!message) return null;
  return (
    <View style={styles.wrap}>
      <Text style={styles.text}>⚠️ {message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { backgroundColor: "#3b1f1f", padding: 10, borderRadius: 10, marginBottom: 12 },
  text: { color: "#ffb4b4" },
});

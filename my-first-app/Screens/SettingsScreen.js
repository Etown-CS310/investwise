// screens/SettingsScreen.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import PrimaryButton from "../components/PrimaryButton";
import { useAuth } from "../context/AuthContext";

export default function SettingsScreen() {
  const { logout, user } = useAuth();
  return (
    <View style={styles.container}>
      <Text style={styles.h}>Account</Text>
      <Text style={styles.p}>Email: {user?.email}</Text>
      <PrimaryButton title="Log out" onPress={logout} style={{ marginTop: 16 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121212", padding: 16, justifyContent: "center" },
  h: { color: "#fff", fontWeight: "bold", marginBottom: 8, fontSize: 18 },
  p: { color: "#ccc" },
});

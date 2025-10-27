// screens/DashboardScreen.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Card from "../components/Card";

export default function DashboardScreen() {
  return (
    <View style={styles.container}>
      <Card style={{ marginBottom: 12 }}>
        <Text style={styles.h}>Welcome 👋</Text>
        <Text style={styles.p}>Use the tabs to manage your portfolio and view market data.</Text>
      </Card>
      <Card>
        <Text style={styles.h}>Milestone 2 Highlights</Text>
        <Text style={styles.p}>• Auth (Firebase REST)</Text>
        <Text style={styles.p}>• CRUD with AsyncStorage</Text>
        <Text style={styles.p}>• CoinGecko API + chart</Text>
        <Text style={styles.p}>• Reusable components</Text>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121212", padding: 16 },
  h: { color: "#fff", fontWeight: "bold", marginBottom: 6, fontSize: 16 },
  p: { color: "#ccc", marginBottom: 4 },
});

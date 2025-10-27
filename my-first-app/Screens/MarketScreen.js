// screens/MarketScreen.js
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import Card from "../components/Card";
import { fetchMarketPrices } from "../services/api";

export default function MarketScreen() {
  const [prices, setPrices] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        setError("");
        const data = await fetchMarketPrices();
        setPrices(data);
      } catch (e) {
        setError("Failed to load market data.");
      }
    })();
  }, []);

  const width = Dimensions.get("window").width - 32;

  return (
    <View style={styles.container}>
      <Card style={{ marginBottom: 12 }}>
        <Text style={styles.h}>Market (CoinGecko)</Text>
        {error ? <Text style={styles.err}>{error}</Text> : null}
        {!prices ? <Text style={styles.p}>Loading...</Text> : (
          <>
            <Text style={styles.p}>Bitcoin: ${prices?.bitcoin?.usd}</Text>
            <Text style={styles.p}>Ethereum: ${prices?.ethereum?.usd}</Text>
          </>
        )}
      </Card>

      {/* Demo chart (static sample) */}
      <Card>
        <Text style={styles.h}>Sample Trend</Text>
        <LineChart
          data={{
            labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            datasets: [{ data: [100, 120, 90, 140, 160, 150, 170] }],
          }}
          width={width}
          height={220}
          chartConfig={{
            backgroundColor: "#1a1a1a",
            backgroundGradientFrom: "#1a1a1a",
            backgroundGradientTo: "#1a1a1a",
            decimalPlaces: 0,
            color: (opacity=1) => `rgba(30, 144, 255, ${opacity})`,
            labelColor: (opacity=1) => `rgba(200, 200, 200, ${opacity})`,
            propsForDots: { r: "3" },
          }}
          bezier
          style={{ borderRadius: 12 }}
        />
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121212", padding: 16 },
  h: { color: "#fff", fontWeight: "bold", marginBottom: 6, fontSize: 16 },
  p: { color: "#ccc" },
  err: { color: "#ffb4b4" },
});

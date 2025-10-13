import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList, ActivityIndicator } from "react-native";
import { StatusBar } from "expo-status-bar";

export default function App() {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Free stock API: Finnhub demo
  const API_KEY = "sandbox_c0t3q2iad3ic4hh5r3dg"; // demo key (replace with free one if you sign up)
  const STOCKS = ["AAPL", "GOOGL", "AMZN", "MSFT", "TSLA"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const results = await Promise.all(
          STOCKS.map(async (symbol) => {
            const res = await fetch(
              `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${API_KEY}`
            );
            const data = await res.json();
            return { symbol, ...data };
          })
        );
        setStocks(results);
      } catch (error) {
        console.error("Error fetching stock data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#00ffcc" />
        <Text style={styles.loadingText}>Loading Stock Data...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>📈 Invest Wisely</Text>
      <FlatList
        data={stocks}
        keyExtractor={(item) => item.symbol}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.symbol}>{item.symbol}</Text>
            <Text style={styles.price}>${item.c.toFixed(2)}</Text>
            <Text style={item.d >= 0 ? styles.up : styles.down}>
              {item.d >= 0 ? "▲" : "▼"} {item.d.toFixed(2)}
            </Text>
          </View>
        )}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0b0c10",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 50,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#66fcf1",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#1f2833",
    borderRadius: 10,
    padding: 15,
    marginVertical: 8,
    width: 320,
    alignItems: "center",
  },
  symbol: {
    fontSize: 18,
    color: "#fff",
  },
  price: {
    fontSize: 22,
    color: "#45a29e",
  },
  up: {
    color: "#00ff99",
    fontWeight: "600",
  },
  down: {
    color: "#ff4d4d",
    fontWeight: "600",
  },
  loadingText: {
    color: "#66fcf1",
    marginTop: 10,
  },
});

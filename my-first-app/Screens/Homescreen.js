import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";


export default function HomeScreen({ navigation }) {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const API_KEY = "sandbox_c0t3q2iad3ic4hh5r3";
  const STOCKS = ["AAPL", "GOOGL", "AMZN", "MSFT", "TSLA"];

  const fetchData = async () => {
    try {
      setRefreshing(true);
      const results = await Promise.all(
        STOCKS.map(async (symbol) => {
          const res = await fetch(
            `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${API_KEY}`
          );
          const data = await res.json();
          return {
            symbol,
            price: data.c,
            change: data.d,
            percentChange: data.dp,
          };
        })
      );
      setStocks(results);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000); // auto refresh
    return () => clearInterval(interval);
  }, []);

  const renderItem = ({ item }) => {
    const price =
      item.price !== undefined && !isNaN(item.price)
        ? item.price.toFixed(2)
        : "N/A";
    const color = item.change >= 0 ? "#00ff88" : "#ff5555";
    const percent =
      item.percentChange !== undefined && !isNaN(item.percentChange)
        ? item.percentChange.toFixed(2)
        : 0;

    return (
      <View style={styles.card}>
        <Text style={styles.symbol}>{item.symbol}</Text>
        <Text style={[styles.price, { color }]}>${price}</Text>
        <Text style={styles.change}>
          {item.change >= 0 ? "▲" : "▼"} {percent}%
        </Text>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#00ffcc" />
        <Text style={styles.loadingText}>Loading stock data...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📊 Live Stock Prices</Text>

      <TouchableOpacity style={styles.refreshBtn} onPress={fetchData}>
        <Text style={styles.refreshText}>
          {refreshing ? "Refreshing..." : "🔄 Refresh Data"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.newsBtn}
        onPress={() => navigation.navigate("News")}
      >
        <Text style={styles.newsText}>📰 Go to Market News</Text>
      </TouchableOpacity>

      <FlatList
        data={stocks}
        keyExtractor={(item) => item.symbol}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    alignItems: "center",
    paddingTop: 60,
  },
  title: {
    fontSize: 22,
    color: "#00ffcc",
    fontWeight: "700",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#1e1e1e",
    padding: 20,
    borderRadius: 15,
    marginVertical: 10,
    width: 320,
    alignItems: "center",
  },
  symbol: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  price: {
    fontSize: 24,
    fontWeight: "bold",
  },
  change: {
    fontSize: 14,
    color: "#ccc",
    marginTop: 4,
  },
  refreshBtn: {
    backgroundColor: "#00ffcc",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  refreshText: {
    color: "#121212",
    fontWeight: "bold",
    fontSize: 16,
  },
  newsBtn: {
    backgroundColor: "#0077b6",
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
  },
  newsText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  loadingText: {
    color: "#ccc",
    marginTop: 10,
  },
});

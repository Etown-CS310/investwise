import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Linking,
  TouchableOpacity,
} from "react-native";

export default function NewsScreen() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_KEY = "sandbox_c0t3q2iad3ic4hh5r3";

  const fetchNews = async () => {
    try {
      const res = await fetch(
        `https://finnhub.io/api/v1/news?category=general&token=${API_KEY}`
      );
      const data = await res.json();
      setNews(data.slice(0, 10)); // show top 10
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#00ffcc" />
        <Text style={styles.loadingText}>Loading news...</Text>
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => Linking.openURL(item.url)}
    >
      <Text style={styles.headline}>{item.headline}</Text>
      <Text style={styles.source}>Source: {item.source}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={news}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 15,
  },
  card: {
    backgroundColor: "#1e1e1e",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  headline: {
    color: "#00ffcc",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
  },
  source: {
    color: "#999",
    fontSize: 12,
  },
  loadingText: {
    color: "#ccc",
    textAlign: "center",
    marginTop: 10,
  },
});

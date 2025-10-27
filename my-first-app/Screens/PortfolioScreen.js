// screens/PortfolioScreen.js
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { loadTransactions, deleteTransaction } from "../lib/storage";
import Card from "../components/Card";
import PrimaryButton from "../components/PrimaryButton";

export default function PortfolioScreen({ navigation }) {
  const [txns, setTxns] = useState([]);

  const refresh = async () => {
    setTxns(await loadTransactions());
  };

  useEffect(() => {
    const unsub = navigation.addListener("focus", refresh);
    return unsub;
  }, [navigation]);

  const onDelete = async (id) => {
    const next = await deleteTransaction(id);
    setTxns(next);
  };

  return (
    <View style={styles.container}>
      <PrimaryButton title="Add Transaction" onPress={() => navigation.navigate("AddEditTransaction")} />
      <FlatList
        style={{ marginTop: 12 }}
        data={txns}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <Card style={{ marginBottom: 10 }}>
            <TouchableOpacity onPress={() => navigation.navigate("AddEditTransaction", { id: item.id, item })}>
              <Text style={styles.title}>{item.asset} • {item.type.toUpperCase()}</Text>
              <Text style={styles.text}>Qty: {item.quantity} @ ${item.price}</Text>
              <Text style={styles.link} onPress={() => onDelete(item.id)}>Delete</Text>
            </TouchableOpacity>
          </Card>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No transactions yet.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121212", padding: 16 },
  title: { color: "#fff", fontWeight: "bold", marginBottom: 6 },
  text: { color: "#ccc" },
  link: { color: "#1e90ff", marginTop: 8 },
  empty: { color: "#777", textAlign: "center", marginTop: 20 },
});

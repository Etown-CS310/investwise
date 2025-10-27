// screens/AddEditTransactionScreen.js
import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import FormField from "../components/FormField";
import PrimaryButton from "../components/PrimaryButton";
import { addTransaction, updateTransaction } from "../lib/storage";

export default function AddEditTransactionScreen({ route, navigation }) {
  const editing = !!route.params?.id;
  const item = route.params?.item;

  const [asset, setAsset] = useState(item?.asset || "BTC");
  const [type, setType] = useState(item?.type || "buy"); // buy | sell
  const [quantity, setQty] = useState(String(item?.quantity || ""));
  const [price, setPrice] = useState(String(item?.price || ""));

  const onSave = async () => {
    if (!asset || !quantity || !price) return Alert.alert("Please fill all fields.");
    const payload = {
      asset: asset.trim().toUpperCase(),
      type: type.trim().toLowerCase() === "sell" ? "sell" : "buy",
      quantity: Number(quantity),
      price: Number(price),
    };
    if (isNaN(payload.quantity) || isNaN(payload.price)) return Alert.alert("Quantity and price must be numbers.");
    if (payload.quantity <= 0 || payload.price <= 0) return Alert.alert("Values must be > 0.");

    if (editing) await updateTransaction(item.id, payload);
    else await addTransaction(payload);

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <FormField label="Asset (e.g., BTC)" value={asset} onChangeText={setAsset} />
      <FormField label="Type (buy/sell)" value={type} onChangeText={setType} />
      <FormField label="Quantity" value={quantity} onChangeText={setQty} keyboardType="numeric" />
      <FormField label="Price (USD)" value={price} onChangeText={setPrice} keyboardType="numeric" />
      <PrimaryButton title={editing ? "Update" : "Save"} onPress={onSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121212", padding: 16, justifyContent: "center" },
});

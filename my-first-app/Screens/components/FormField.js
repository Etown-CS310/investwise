import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

export default function FormField({ label, value, onChangeText, secureTextEntry, keyboardType }) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholder={label}
        placeholderTextColor="#777"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginBottom: 12 },
  label: { color: "#bbb", marginBottom: 6 },
  input: {
    color: "#fff",
    backgroundColor: "rgba(255,255,255,0.08)",
    borderColor: "#2a2a2a",
    borderWidth: 1,
    padding: 12,
    borderRadius: 10,
  },
});

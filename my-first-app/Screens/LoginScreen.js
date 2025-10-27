import React, { useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { useAuth } from "../context/AuthContext";
import PrimaryButton from "../components/PrimaryButton";
import FormField from "../components/FormField";
import ErrorBanner from "../components/ErrorBanner";
import LoadingOverlay from "../components/LoadingOverlay";

export default function LoginScreen({ navigation }) {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  const onLogin = async () => {
    setErr("");
    if (!email.includes("@")) return setErr("Enter a valid email.");
    if (password.length < 6) return setErr("Password must be 6+ chars.");
    try {
      setBusy(true);
      await login(email.trim(), password);
      Alert.alert("Welcome back!");
    } catch (e) {
      setErr(e.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <View style={styles.container}>
      <LoadingOverlay visible={busy} />
      <Text style={styles.title}>InvestWise</Text>
      <Text style={styles.subtitle}>Login to your account</Text>
      <ErrorBanner message={err} />
      <FormField label="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
      <FormField label="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <PrimaryButton title="Login" onPress={onLogin} />
      <Text style={styles.link} onPress={() => navigation.navigate("Signup")}>Create Account</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121212", padding: 20, justifyContent: "center" },
  title: { color: "#fff", fontSize: 32, fontWeight: "bold", marginBottom: 8 },
  subtitle: { color: "#bbb", marginBottom: 16 },
  link: { color: "#1e90ff", marginTop: 16, textAlign: "center", textDecorationLine: "underline" },
});

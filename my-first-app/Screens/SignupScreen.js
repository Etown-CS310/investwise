import React, { useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { useAuth } from "../context/AuthContext";
import PrimaryButton from "../components/PrimaryButton";
import FormField from "../components/FormField";
import ErrorBanner from "../components/ErrorBanner";
import LoadingOverlay from "../components/LoadingOverlay";

export default function SignupScreen({ navigation }) {
  const { signup } = useAuth();
  const [firstName, setFirst] = useState("");
  const [lastName, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  const onSignup = async () => {
    setErr("");
    if (!firstName || !lastName) return setErr("Enter first and last name.");
    if (!email.includes("@")) return setErr("Enter a valid email.");
    if (password.length < 6) return setErr("Password must be 6+ chars.");

    try {
      setBusy(true);
      await signup(email.trim(), password, firstName.trim(), lastName.trim());
      Alert.alert("Account created!");
    } catch (e) {
      setErr(e.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <View style={styles.container}>
      <LoadingOverlay visible={busy} />
      <Text style={styles.title}>Create Account</Text>
      <ErrorBanner message={err} />
      <FormField label="First Name" value={firstName} onChangeText={setFirst} />
      <FormField label="Last Name" value={lastName} onChangeText={setLast} />
      <FormField label="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
      <FormField label="Password" value={password} onChangeText={setPass} secureTextEntry />
      <PrimaryButton title="Sign Up" onPress={onSignup} />
      <Text style={styles.link} onPress={() => navigation.navigate("Login")}>Back to Login</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121212", padding: 20, justifyContent: "center" },
  title: { color: "#fff", fontSize: 28, fontWeight: "bold", marginBottom: 16 },
  link: { color: "#1e90ff", marginTop: 16, textAlign: "center", textDecorationLine: "underline" },
});

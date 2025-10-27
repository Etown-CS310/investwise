// lib/storage.js
import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "@portfolio_txns";

export async function loadTransactions() {
  const raw = await AsyncStorage.getItem(KEY);
  return raw ? JSON.parse(raw) : [];
}

export async function saveTransactions(list) {
  await AsyncStorage.setItem(KEY, JSON.stringify(list));
}

export async function addTransaction(txn) {
  const list = await loadTransactions();
  list.push({ id: Date.now().toString(), ...txn });
  await saveTransactions(list);
  return list;
}

export async function updateTransaction(id, updates) {
  const list = await loadTransactions();
  const idx = list.findIndex(t => t.id === id);
  if (idx !== -1) list[idx] = { ...list[idx], ...updates };
  await saveTransactions(list);
  return list;
}

export async function deleteTransaction(id) {
  const list = await loadTransactions();
  const next = list.filter(t => t.id !== id);
  await saveTransactions(next);
  return next;
}

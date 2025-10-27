import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "@transactions";

export async function getTransactions() {
  const data = await AsyncStorage.getItem(KEY);
  return data ? JSON.parse(data) : [];
}

export async function saveTransactions(list) {
  await AsyncStorage.setItem(KEY, JSON.stringify(list));
}

export async function addTransaction(txn) {
  const list = await getTransactions();
  list.push({ id: Date.now().toString(), ...txn });
  await saveTransactions(list);
}

export async function deleteTransaction(id) {
  const list = await getTransactions();
  const updated = list.filter((t) => t.id !== id);
  await saveTransactions(updated);
}

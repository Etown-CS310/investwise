// context/AuthContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext(null);
const USERS_KEY = "@users";
const CURRENT_USER_KEY = "@auth_user";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem(CURRENT_USER_KEY);
      if (saved) setUser(JSON.parse(saved));
    })();
  }, []);

  const signup = async (email, password, firstName, lastName) => {
    const users = JSON.parse(await AsyncStorage.getItem(USERS_KEY)) || [];
    if (users.find((u) => u.email === email)) throw new Error("Email already exists");

    const newUser = { email, password, firstName, lastName };
    users.push(newUser);
    await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
    await AsyncStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));
    setUser(newUser);
  };

  const login = async (email, password) => {
    const users = JSON.parse(await AsyncStorage.getItem(USERS_KEY)) || [];
    const found = users.find((u) => u.email === email && u.password === password);
    if (!found) throw new Error("Invalid credentials");
    await AsyncStorage.setItem(CURRENT_USER_KEY, JSON.stringify(found));
    setUser(found);
  };

  const logout = async () => {
    await AsyncStorage.removeItem(CURRENT_USER_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

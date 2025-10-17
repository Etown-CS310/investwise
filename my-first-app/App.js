import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./Screens/HomeScreen";
// import NewsScreen from "./Screens/NewsScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: "#121212" },
          headerTintColor: "#00ffcc",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "📈 InvestWise - Stocks" }}
        />
        <Stack.Screen
          name="News"
          component={NewsScreen}
          options={{ title: "📰 Market News" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

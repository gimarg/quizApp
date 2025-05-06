import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "./screens/ProfileScreen";
import CategoryScreen from "./screens/CategoryScreen";
import QuizScreen from "./screens/QuizScreen";
import AssistantScreen from "./screens/AssistantScreen";
import { CategoryData } from "./types";

export type RootStackParamList = {
  Profile: undefined;
  Category: { profile: "player" | "assistant" };
  Quiz: { category: CategoryData };
  Assistant: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Profile">
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Category" component={CategoryScreen} />
        <Stack.Screen name="Quiz" component={QuizScreen} />
        <Stack.Screen name="Assistant" component={AssistantScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

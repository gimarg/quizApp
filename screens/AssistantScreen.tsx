import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";

type Props = NativeStackScreenProps<RootStackParamList, "Assistant">;

export default function AssistantScreen({ navigation }: Props) {
  return (
    <View style={styles.centered}>
      <Text style={styles.title}>Assistant Mode</Text>
      <Text style={{ marginVertical: 20 }}>Coming soon...</Text>
      <Button title="Back to Profile" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
});

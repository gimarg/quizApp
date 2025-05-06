import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Button,
} from "react-native";
import axios from "axios";
import { CategoryData } from "../types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";

type Props = NativeStackScreenProps<RootStackParamList, "Category">;

export default function CategoryScreen({ navigation, route }: Props) {
  const { profile } = route.params;

  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const url =
      profile === "assistant"
        ? "https://quiz-backend-6pci.onrender.com/assistantQuestions"
        : "https://quiz-backend-6pci.onrender.com/playerQuestions";

    axios
      .get(url)
      .then((res) => {
        setCategories(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load questions: " + err.message);
        setLoading(false);
      });
  }, [profile]);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>{error}</Text>;

  return (
    <ScrollView contentContainerStyle={styles.centered}>
      <Text style={styles.title}>Select a Category</Text>
      {categories.map((cat, index) => (
        <TouchableOpacity
          key={index}
          style={styles.button}
          onPress={() => navigation.navigate("Quiz", { category: cat })}
        >
          <Text style={styles.buttonText}>{cat.category}</Text>
        </TouchableOpacity>
      ))}
      <View style={{ marginTop: 20 }}>
        <Button title="Back to Profile" onPress={() => navigation.goBack()} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  centered: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 16,
    borderRadius: 8,
    marginVertical: 10,
    minWidth: 200,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
  },
});

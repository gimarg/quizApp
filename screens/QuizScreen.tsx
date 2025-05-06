import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Button,
  Alert,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import { Question } from "../types";

type Props = NativeStackScreenProps<RootStackParamList, "Quiz">;

export default function QuizScreen({ route, navigation }: Props) {
  const { category } = route.params;

  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: string]: number;
  }>({});
  const [lockedQuestions, setLockedQuestions] = useState<{
    [key: string]: boolean;
  }>({});

  const handleAnswer = (
    qKey: string,
    selectedIndex: number,
    correctIndex: number,
    info: string
  ) => {
    if (lockedQuestions[qKey]) return;

    const isCorrect = selectedIndex === correctIndex;
    Alert.alert(
      isCorrect ? "✅ Correct!" : "❌ Wrong",
      isCorrect ? info : undefined
    );

    setSelectedAnswers((prev) => ({ ...prev, [qKey]: selectedIndex }));
    if (isCorrect) {
      setLockedQuestions((prev) => ({ ...prev, [qKey]: true }));
    }
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setLockedQuestions({});
  };

  return (
    <ScrollView style={{ padding: 20 }}>
      <View style={{ marginBottom: 10 }}>
        <Button
          title="Back to Categories"
          onPress={() => navigation.goBack()}
        />
      </View>
      <View style={{ marginBottom: 20 }}>
        <Button title="Reset Answers" onPress={handleReset} />
      </View>
      <Text style={styles.title}>{category.category}</Text>

      {category.questions.map((q, qIndex) => {
        const qKey = `${category.category}-${q.id}`;
        const selectedIndex = selectedAnswers[qKey];
        const isLocked = lockedQuestions[qKey];

        return (
          <View key={qKey} style={{ marginBottom: 30 }}>
            <Text style={styles.questionText}>{q.question}</Text>
            {q.options.map((opt, i) => {
              const isSelected = selectedIndex === i;
              const isCorrect = i === q.answer;
              const bgColor = isSelected && isCorrect ? "lightgreen" : "#eee";

              return (
                <TouchableOpacity
                  key={i}
                  style={[styles.option, { backgroundColor: bgColor }]}
                  onPress={() => handleAnswer(qKey, i, q.answer, q.info)}
                  disabled={isLocked}
                >
                  <Text>{opt}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
  questionText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  option: {
    padding: 12,
    marginVertical: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
  },
});

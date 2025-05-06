import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  Button,
} from "react-native";
import axios from "axios";

export default function App() {
  const [data, setData] = useState([]); // categories with questions
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: string]: number;
  }>({});
  const [lockedQuestions, setLockedQuestions] = useState<{
    [key: string]: boolean;
  }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("https://quiz-backend-6pci.onrender.com/questions") // Your API now returns categories
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load questions: " + err.message);
        setLoading(false);
      });
  }, []);

  const handleAnswer = (
    qId: string,
    selectedIndex: number,
    correctIndex: number,
    info: string
  ) => {
    if (lockedQuestions[qId]) return;

    const isCorrect = selectedIndex === correctIndex;
    Alert.alert(
      isCorrect ? "✅ Correct!" : "❌ Wrong",
      isCorrect ? info : undefined
    );

    setSelectedAnswers((prev) => ({ ...prev, [qId]: selectedIndex }));
    if (isCorrect) {
      setLockedQuestions((prev) => ({ ...prev, [qId]: true }));
    }
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setLockedQuestions({});
  };

  if (loading) return <Text style={{ margin: 100 }}>Loading...</Text>;
  if (error) return <Text style={{ color: "red", margin: 100 }}>{error}</Text>;

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView style={{ padding: 20 }}>
        <View style={styles.resetButtonContainer}>
          <Button title="Reset All Answers" onPress={handleReset} />
        </View>

        {data.map((section: any, sectionIndex: number) => (
          <View key={sectionIndex} style={{ marginBottom: 40 }}>
            <Text style={styles.categoryTitle}>{section.category}</Text>

            {section.questions.map((q: any, qIndex: number) => {
              const qKey = `${sectionIndex}-${q.id}`; // unique ID across all categories
              const selectedIndex = selectedAnswers[qKey];
              const isLocked = lockedQuestions[qKey];

              return (
                <View key={qKey} style={{ marginBottom: 20 }}>
                  <Text style={styles.questionText}>{q.question}</Text>
                  {q.options.map((opt: string, i: number) => {
                    const isSelected = selectedIndex === i;
                    const isCorrect = i === q.answer;
                    const bgColor =
                      isSelected && isCorrect ? "lightgreen" : "#eee";

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
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  categoryTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingBottom: 5,
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
  resetButtonContainer: {
    marginTop: 30,
    marginBottom: 20,
    alignSelf: "flex-end",
    borderRadius: 6,
    overflow: "hidden",
  },
});

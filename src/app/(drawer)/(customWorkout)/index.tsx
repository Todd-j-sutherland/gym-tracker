import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

const CustomExerciseForm = () => {
  const [category, setCategory] = useState("");
  const [workoutName, setWorkoutName] = useState("");
  const [isWeighted, setIsWeighted] = useState(false);
  const [weight, setWeight] = useState("");
  const [repsGoal, setRepsGoal] = useState("");

  const handleCreateExercise = () => {
    console.log("Exercise created:", {
      category,
      workoutName,
      isWeighted,
      weight,
      repsGoal,
    });
  };

  return (
    <View style={styles.container}>
      <Picker
        style={styles.picker}
        selectedValue={category}
        onValueChange={(itemValue) => setCategory(itemValue)}
        mode="dropdown"
      >
        <Picker.Item label="Select exercise category" value="" />
        <Picker.Item label="Category 1" value="category1" />
        <Picker.Item label="Category 2" value="category2" />
      </Picker>

      <TextInput
        style={styles.input}
        placeholder="Workout name"
        value={workoutName}
        onChangeText={setWorkoutName}
      />

      <View style={styles.switchContainer}>
        <Button
          title={isWeighted ? "Change to Unweighted" : "Change to Weighted"}
          onPress={() => setIsWeighted(!isWeighted)}
          color="#007AFF"
        />
        {isWeighted && (
          <TextInput
            style={[styles.input, { marginTop: 10 }]}
            placeholder="Weight (KG)"
            value={weight}
            keyboardType="numeric"
            onChangeText={setWeight}
          />
        )}
      </View>

      <TextInput
        style={styles.input}
        placeholder="Reps goal"
        value={repsGoal}
        keyboardType="numeric"
        onChangeText={setRepsGoal}
      />

      <Button
        title="Create Exercise"
        onPress={handleCreateExercise}
        color="#007AFF"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F9F9F9",
  },
  picker: {
    height: 50,
    backgroundColor: "#FFF",
    borderColor: "#E8E8E8",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingLeft: 12,
  },
  input: {
    height: 50,
    borderColor: "#E8E8E8",
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "#FFF",
    paddingLeft: 15,
    marginBottom: 20,
  },
  switchContainer: {
    marginBottom: 20,
  },
});

export default CustomExerciseForm;
